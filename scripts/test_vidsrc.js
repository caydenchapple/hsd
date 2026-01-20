const puppeteer = require('puppeteer');

// Get URL from args or env, default to provided test URL if available
const TARGET_URL = process.argv[2] || process.env.TARGET_URL || 'http://localhost:3000';

(async () => {
  console.log('Starting stress/security test suite...');
  console.log(`Target URL: ${TARGET_URL}`);

  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();

  // Set viewport to desktop
  await page.setViewport({ width: 1280, height: 800 });

  try {
    // ----------------------------------------------------------------
    // 1. Feature Test: Video Player Source Switching
    // ----------------------------------------------------------------
    console.log(`\n[Test 1] Testing Video Player Source Switching at ${TARGET_URL}/watch/533535`);
    
    try {
        await page.goto(`${TARGET_URL}/watch/533535`, { waitUntil: 'networkidle0', timeout: 60000 });
    } catch (e) {
        console.log("Navigation timeout or error, checking if page loaded anyway...");
    }

    // Check default source (VidNest)
    // Wait for iframe
    await page.waitForSelector('iframe', { timeout: 5000 }).catch(() => console.log("Iframe not found immediately"));
    
    let iframeSrc = await page.$eval('iframe', el => el.src).catch(e => "Error getting src");
    console.log('Initial iframe src:', iframeSrc);
    
    if (iframeSrc.includes('vidnest.fun')) {
      console.log('PASS: Default source is VidNest');
    } else {
      console.warn('WARN: Default source might not be VidNest or page failed to load correctly');
    }

    // Switch to VidSrc
    console.log('Switching to VidSrc...');
    // The select is the only select on the page usually, or we can target by structure
    // In WatchPlayer.tsx: <select value={source} ...>
    await page.waitForSelector('select', { timeout: 5000 });
    await page.select('select', 'vidsrc');
    
    // Wait for update (react state update)
    await new Promise(r => setTimeout(r, 2000));
    
    iframeSrc = await page.$eval('iframe', el => el.src);
    console.log('New iframe src:', iframeSrc);
    
    if (iframeSrc.includes('vidsrc.cc')) {
      console.log('PASS: Source switched to VidSrc');
    } else {
      console.error('FAIL: Source did not switch to VidSrc');
    }

    // ----------------------------------------------------------------
    // 2. Input Validation / Security: Search Bar XSS
    // ----------------------------------------------------------------
    console.log(`\n[Test 2] Testing Search Bar Input Validation (XSS Attempt)`);
    await page.goto(`${TARGET_URL}`, { waitUntil: 'domcontentloaded' });
    
    // Check if search icon exists
    const searchIconSelector = 'svg.lucide-search';
    const searchIcon = await page.$(searchIconSelector);
    
    if (searchIcon) {
        console.log("Found search icon, attempting XSS injection...");
        await searchIcon.click();
        
        // Wait for input to be visible (it has transition)
        await new Promise(r => setTimeout(r, 500));
        
        const maliciousInput = '<script>alert("XSS")</script>';
        await page.type('input[type="text"]', maliciousInput);
        await page.keyboard.press('Enter');
        
        // Handle dialog
        let dialogHandled = false;
        page.on('dialog', async dialog => {
            console.log('ALERT DETECTED:', dialog.message());
            await dialog.dismiss();
            dialogHandled = true;
        });

        await new Promise(r => setTimeout(r, 3000));
        
        if (dialogHandled) {
             console.error('FAIL: XSS Alert executed!');
        } else {
             console.log('PASS: No alert execution detected.');
        }

        const currentUrl = page.url();
        console.log('Current URL:', currentUrl);
        if (currentUrl.includes('%3Cscript%3E') || currentUrl.includes('<script>')) {
            console.log('INFO: Script tags present in URL parameters (Standard behavior, but should be handled by Next.js safely)');
        }
    } else {
        console.log('SKIP: Search icon not found');
    }

    // ----------------------------------------------------------------
    // 3. Stress Test: Rapid Source Switching
    // ----------------------------------------------------------------
    console.log(`\n[Test 3] Stress Test: Rapid Source Switching`);
    await page.goto(`${TARGET_URL}/watch/533535`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('select');

    console.log("Rapidly switching sources 10 times...");
    for(let i=0; i<10; i++) {
        const val = i % 2 === 0 ? 'vidnest' : 'vidsrc';
        await page.select('select', val);
        // Very short delay to simulate rapid user input
        await new Promise(r => setTimeout(r, 50));
    }
    
    // Wait for settle
    await new Promise(r => setTimeout(r, 1000));
    
    iframeSrc = await page.$eval('iframe', el => el.src);
    console.log('Final iframe src after rapid switch:', iframeSrc);
    if (iframeSrc.includes('vidsrc.cc') || iframeSrc.includes('vidnest.fun')) {
         console.log('PASS: App remained stable and settled on a valid source');
    } else {
         console.error('FAIL: App state unclear or crashed');
    }

  } catch (error) {
    console.error('Test Suite Failed:', error);
    await page.screenshot({ path: 'scripts/error_screenshot.png' });
    console.log('Screenshot saved to scripts/error_screenshot.png');
  } finally {
    await browser.close();
    console.log('\nTest Suite Completed.');
  }
})();
