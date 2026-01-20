const puppeteer = require('puppeteer');

const TARGET_URL = process.argv[2] || 'https://hsd-one.vercel.app';

(async () => {
  console.log('Testing Search Features (Instant Search & Infinite Scroll)...');
  console.log(`Target: ${TARGET_URL}`);

  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  
  try {
    // 1. Test Instant Search (Debounce)
    console.log('\n[Test 1] Instant Search (Debounced URL update)');
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
    
    // Click search icon to open input
    // The icon is usually the first svg in the header or we can find by class
    // Navbar.tsx: <Search onClick={() => setShowSearch(!showSearch)} ... />
    // We can try to click the SVG or just force the input to be visible if we can find it.
    // Let's click the search icon.
    await page.waitForSelector('.lucide-search'); 
    await page.click('.lucide-search');
    
    // Type "avengers" slowly
    await page.waitForSelector('input[type="text"]');
    await page.type('input[type="text"]', 'avengers', { delay: 100 });
    
    // Wait for debounce (500ms) + navigation
    console.log('Waiting for debounced navigation...');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 5000 }).catch(e => console.log('Navigation timeout or already happened'));
    
    const url = page.url();
    console.log(`Current URL: ${url}`);
    
    if (url.includes('/search?q=avengers')) {
        console.log('[PASS] URL updated automatically to search query');
    } else {
        console.error('[FAIL] URL did not update. Instant search might be broken.');
    }

    // 2. Test Infinite Scroll on Search Results
    console.log('\n[Test 2] Infinite Scroll on Search Results');
    // Ensure we are on the search page with results
    if (!url.includes('/search')) {
        await page.goto(`${TARGET_URL}/search?q=action`, { waitUntil: 'networkidle0' });
    }

    // Get initial item count
    const getCount = () => page.$$eval('a[href^="/watch"]', els => els.length); // Assuming thumbnails are links to /watch
    // Or check the grid items. Thumbnail.tsx usually wraps in a Link.
    
    await page.waitForSelector('main .grid');
    const initialCount = await getCount();
    console.log(`Initial result count: ${initialCount}`);
    
    if (initialCount === 0) {
        console.warn('No results found for query. Cannot test scroll.');
    } else {
        // Scroll to bottom
        console.log('Scrolling to bottom...');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        
        // Wait for fetch and render
        await new Promise(r => setTimeout(r, 3000));
        
        const newCount = await getCount();
        console.log(`New result count: ${newCount}`);
        
        if (newCount > initialCount) {
            console.log('[PASS] Infinite scroll loaded more results');
        } else {
            console.warn('[WARN] Count did not increase. Might be end of results or broken scroll.');
        }
    }

  } catch (error) {
    console.error('Test Failed:', error);
  } finally {
    await browser.close();
  }
})();
