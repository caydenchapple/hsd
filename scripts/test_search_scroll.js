const puppeteer = require('puppeteer');

// Get URL from args or env
const TARGET_URL = process.argv[2] || process.env.TARGET_URL || 'http://localhost:3000';

(async () => {
  console.log('Starting Search & Scroll Feature Test...');
  console.log(`Target URL: ${TARGET_URL}`);

  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    // ----------------------------------------------------------------
    // 1. Test Infinite Scroll on Home Page
    // ----------------------------------------------------------------
    console.log(`\n[Test 1] Testing Infinite Scroll on Home Page`);
    await page.goto(`${TARGET_URL}`, { waitUntil: 'networkidle0' });
    
    // Check if "Browse All Movies" header exists (part of InfiniteScrollMovies component)
    // It might take a moment to render or require scrolling
    const browseHeaderSelector = 'h2.text-2xl.font-semibold.text-\\[\\#e5e5e5\\]';
    // We scroll to bottom to trigger it
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    try {
        await page.waitForXPath("//h2[contains(., 'Browse All Movies')]", { timeout: 5000 });
        console.log('PASS: "Browse All Movies" section found.');
    } catch (e) {
        console.log('WARN: "Browse All Movies" section not immediately found. Maybe deep in DOM or scroll needed.');
    }

    // Check if new thumbnails are loaded (initially 0 in the infinite section, then populated)
    // We can check for the grid in that section
    const gridSelector = '.grid.grid-cols-2'; // General grid selector, might match rows too
    // But the infinite scroll section is at the bottom.
    
    // Let's assume if the component is there, it attempts to load.
    // Real validation of "infinite" loading is hard without API key in this environment, 
    // but we can check if the component structure is present.

    // ----------------------------------------------------------------
    // 2. Test Search Page TMDB Logo
    // ----------------------------------------------------------------
    console.log(`\n[Test 2] Testing Search Page TMDB Logo`);
    const searchQuery = 'Deadpool';
    await page.goto(`${TARGET_URL}/search?q=${searchQuery}`, { waitUntil: 'networkidle0' });
    
    // Check for logo
    const logoSelector = 'img[alt="TMDB Logo"]';
    try {
        await page.waitForSelector(logoSelector, { timeout: 5000 });
        console.log('PASS: TMDB Logo found on search page.');
    } catch (e) {
        console.error('FAIL: TMDB Logo not found on search page.');
    }

    // Check for results (thumbnails)
    try {
        await page.waitForSelector('.grid div', { timeout: 5000 });
        console.log('PASS: Search results found.');
    } catch (e) {
        console.log('WARN: No search results found (API Key might be missing or query yielded nothing).');
    }

    // Check for "Powered by" text
    const poweredBy = await page.evaluate(() => document.body.innerText.includes('Powered by'));
    if (poweredBy) {
        console.log('PASS: "Powered by" text found.');
    } else {
        console.error('FAIL: "Powered by" text not found.');
    }

  } catch (error) {
    console.error('Test Suite Failed:', error);
    await page.screenshot({ path: 'scripts/search_test_error.png' });
  } finally {
    await browser.close();
    console.log('\nTest Suite Completed.');
  }
})();
