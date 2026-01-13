import { NextRequest, NextResponse } from 'next/server';

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
    
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    };

    const response = await fetch(targetUrl.toString(), { headers });
    const contentType = response.headers.get('content-type') || '';

    // If it's HTML, we need to rewrite links
    if (contentType.includes('text/html')) {
      const text = await response.text();
      
      const proxyUrl = (u: string) => {
        try {
            if (!u) return u;
            if (u.startsWith('http')) return `/api/proxy?url=${encodeURIComponent(u)}`;
            if (u.startsWith('//')) return `/api/proxy?url=${encodeURIComponent('https:' + u)}`;
            if (u.startsWith('/')) return `/api/proxy?url=${encodeURIComponent(new URL(u, targetUrl).toString())}`;
            if (u.startsWith('#') || u.startsWith('mailto:') || u.startsWith('javascript:') || u.startsWith('data:')) {
                return u;
            }
            // Relative path
            return `/api/proxy?url=${encodeURIComponent(new URL(u, targetUrl).toString())}`;
        } catch (e) {
            return u;
        }
      };

      // Rewrite href, src, action attributes
      // This regex handles double and single quotes
      const rewritten = text.replace(/(href|src|action)=["']([^"']+)["']/g, (match, attr, val) => {
        return `${attr}="${proxyUrl(val)}"`;
      });
      
      return new NextResponse(rewritten, {
        headers: {
          'Content-Type': 'text/html',
        }
      });
    }

    // For other assets, pipe the body
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': contentType,
      }
    });

  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Error fetching URL: ' + error, { status: 500 });
  }
}
