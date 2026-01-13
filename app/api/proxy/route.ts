import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: NextRequest) {
  const urlStr = req.nextUrl.searchParams.get('url');
  if (!urlStr) {
    return new NextResponse('Missing URL parameter', { status: 400 });
  }

  try {
    let targetUrlString = urlStr;
    if (!targetUrlString.startsWith('http')) {
        targetUrlString = 'https://' + targetUrlString;
    }

    const targetUrl = new URL(targetUrlString);
    
    // Mimic a real browser to avoid blocks
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    };

    const response = await fetch(targetUrl.toString(), { 
        headers,
        redirect: 'follow',
    });

    const contentType = response.headers.get('content-type') || '';

    // If it's HTML, we need to rewrite links robustly
    if (contentType.includes('text/html')) {
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const proxyUrl = (u: string) => {
        try {
            if (!u) return u;
            // Handle data URIs and anchors
            if (u.startsWith('data:') || u.startsWith('#') || u.startsWith('mailto:') || u.startsWith('javascript:')) {
                return u;
            }
            
            // Resolve absolute URL
            const resolvedUrl = new URL(u, targetUrl).toString();
            return `/api/proxy?url=${encodeURIComponent(resolvedUrl)}`;
        } catch (e) {
            return u;
        }
      };

      // Rewrite standard attributes
      $('a, area, base, link').each((_, el) => {
        const href = $(el).attr('href');
        if (href) $(el).attr('href', proxyUrl(href));
      });

      $('img, script, source, iframe, embed, audio, video, track, input').each((_, el) => {
        const src = $(el).attr('src');
        if (src) $(el).attr('src', proxyUrl(src));
      });

      $('form').each((_, el) => {
        const action = $(el).attr('action');
        if (action) $(el).attr('action', proxyUrl(action));
      });
      
      // Rewrite srcset (used by many modern sites including Google)
      $('img, source').each((_, el) => {
        const srcset = $(el).attr('srcset');
        if (srcset) {
            const newSrcset = srcset.split(',').map(part => {
                const [url, ...desc] = part.trim().split(/\s+/);
                return `${proxyUrl(url)} ${desc.join(' ')}`;
            }).join(', ');
            $(el).attr('srcset', newSrcset);
        }
      });

      // Handle style attributes (background-image: url(...))
      $('*[style]').each((_, el) => {
        const style = $(el).attr('style');
        if (style && style.includes('url(')) {
            const newStyle = style.replace(/url\(['"]?([^'")]+)['"]?\)/g, (match, url) => {
                return `url('${proxyUrl(url)}')`;
            });
            $(el).attr('style', newStyle);
        }
      });

      // Remove security headers that might block framing
      const responseHeaders = new Headers();
      responseHeaders.set('Content-Type', 'text/html');
      // Add standard headers
      responseHeaders.set('Cache-Control', 'no-store');

      return new NextResponse($.html(), {
        headers: responseHeaders,
      });
    }

    // For other assets (CSS, JS, Images), we need to rewrite imports if possible, but mostly pipe
    // If it's CSS, we might want to rewrite url(...)
    if (contentType.includes('text/css')) {
       const text = await response.text();
       const rewritten = text.replace(/url\(['"]?([^'")]+)['"]?\)/g, (match, url) => {
            // Check if it's data URI
            if (url.startsWith('data:')) return match;
            try {
                const resolvedUrl = new URL(url, targetUrl).toString();
                return `url('/api/proxy?url=${encodeURIComponent(resolvedUrl)}')`;
            } catch(e) {
                return match;
            }
       });
       
       return new NextResponse(rewritten, {
         headers: { 'Content-Type': contentType }
       });
    }

    // Pipe binary/other content directly
    // Create new headers to strip security restrictions
    const newHeaders = new Headers();
    if (contentType) newHeaders.set('Content-Type', contentType);
    
    // Forward relevant headers?
    // Be careful with CORS. Since we are proxying, we are the origin.

    return new NextResponse(response.body, {
      headers: newHeaders
    });

  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Error fetching URL: ' + error, { status: 500 });
  }
}
