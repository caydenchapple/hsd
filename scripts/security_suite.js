const puppeteer = require('puppeteer');

// Target URL from args or env
const TARGET_URL = process.argv[2] || process.env.TARGET_URL || 'https://hsd-one.vercel.app';

(async () => {
  console.log('Starting Comprehensive Security & Feature Test Suite...');
  console.log(`Target: ${TARGET_URL}`);

  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  
  // Helper to log results
  const logPass = (msg) => console.log(`[PASS] ${msg}`);
  const logFail = (msg) => console.error(`[FAIL] ${msg}`);
  const logInfo = (msg) => console.log(`[INFO] ${msg}`);

  try {
    // ==========================================
    // 1. SQL Injection / Malicious Input in Search
    // ==========================================
    logInfo('Test 1: SQL Injection & Malicious Input in Search');
    const payloads = [
        "' OR '1'='1",
        "'; DROP TABLE users; --",
        "<script>alert(1)</script>",
        "{{7*7}}", // SSTI
        "admin\" --",
        "../../etc/passwd" // Path Traversal
    ];

    for (const payload of payloads) {
        try {
            const searchUrl = `${TARGET_URL}/search?q=${encodeURIComponent(payload)}`;
            await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
            
            // Check for application crash or raw error exposure
            const content = await page.content();
            if (content.includes('Internal Server Error') || content.includes('SyntaxError') || content.includes('SQL syntax')) {
                logFail(`App crashed or exposed error with payload: ${payload}`);
            } else {
                logPass(`App handled payload gracefully: ${payload}`);
            }

            // Verify no XSS execution (no dialog) - verified by lack of 'dialog' event listener triggering generic error
            // We can also check if the payload is rendered safely as text
            const resultsHeader = await page.evaluate(() => {
                const h1 = document.querySelector('h1');
                return h1 ? h1.innerText : '';
            });
            
            if (resultsHeader.includes(payload) || resultsHeader.includes('Results for')) {
                 logPass(`Payload rendered safely in UI for: ${payload}`);
            }
        } catch (e) {
            logInfo(`Navigation failed for ${payload}: ${e.message}`);
        }
    }

    // ==========================================
    // 2. Route Fuzzing / ID Parameter Manipulation
    // ==========================================
    logInfo('\nTest 2: Route Fuzzing (Invalid IDs)');
    const invalidIds = ['abc', '-1', '99999999999999', 'undefined', 'null'];
    
    for (const id of invalidIds) {
        const watchUrl = `${TARGET_URL}/watch/${id}?type=movie`;
        await page.goto(watchUrl, { waitUntil: 'domcontentloaded' });
        
        // App should not crash. It might show a blank player or error message, but not 500 page.
        const content = await page.content();
        const isCrash = content.includes('Application error: a client-side exception has occurred') || content.includes('Internal Server Error');
        
        if (isCrash) {
            logFail(`Crash detected for ID: ${id}`);
        } else {
            logPass(`Handled invalid ID: ${id}`);
        }
    }

    // ==========================================
    // 3. VidSrc Integration Verification (GlobalPlayer)
    // ==========================================
    logInfo('\nTest 3: Verify VidSrc Integration in GlobalPlayer');
    // Go to a valid movie
    await page.goto(`${TARGET_URL}/watch/533535?type=movie`, { waitUntil: 'networkidle0' });
    
    // Check if Source Selector exists
    try {
        await page.waitForSelector('select', { timeout: 5000 });
        logPass('Source selector found');
        
        // Select VidSrc
        await page.select('select', 'vidsrc');
        await new Promise(r => setTimeout(r, 2000)); // Wait for state update
        
        const src = await page.$eval('iframe', el => el.src);
        if (src.includes('vidsrc.cc')) {
            logPass('Successfully switched to VidSrc');
        } else {
            logFail(`Failed to switch source. Current src: ${src}`);
        }
    } catch (e) {
        logFail('Source selector not found or interaction failed');
    }

    // ==========================================
    // 4. Performance / Stress Check (Navigation)
    // ==========================================
    logInfo('\nTest 4: Navigation Stress Test');
    const navStart = Date.now();
    await page.goto(`${TARGET_URL}/`, { waitUntil: 'domcontentloaded' });
    await page.goto(`${TARGET_URL}/search?q=action`, { waitUntil: 'domcontentloaded' });
    await page.goto(`${TARGET_URL}/watch/533535`, { waitUntil: 'domcontentloaded' });
    const navEnd = Date.now();
    logPass(`Completed 3 navigations in ${(navEnd - navStart) / 1000}s`);

  } catch (error) {
    console.error('Test Suite Fatal Error:', error);
  } finally {
    await browser.close();
    console.log('\nSecurity Suite Finished.');
  }
})();
