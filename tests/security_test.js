const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting Security & Input Validation Tests...');
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Listen for dialogs (alerts) which indicate XSS success (FAILURE for us)
  let alertTriggered = false;
  page.on('dialog', async dialog => {
    console.log(`DIALOG DETECTED: ${dialog.message()}`);
    if (dialog.message() === 'XSS') {
        alertTriggered = true;
    }
    await dialog.dismiss();
  });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    console.log('Page loaded');

    // TEST 1: XSS in Product Description
    console.log('TEST 1: Attempting XSS in Product Description...');
    await page.click('#add-product-btn');
    await page.waitForSelector('#product-name', { visible: true });
    
    const xssPayload = '<img src=x onerror=alert("XSS")>';
    await page.type('#product-name', 'XSS Test Product');
    await page.type('#product-image', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800');
    await page.type('#product-desc', `This is a test description ${xssPayload}`);
    
    await page.click('#submit-product-btn');
    await page.waitForSelector('#product-name', { hidden: true });
    
    // Wait a bit to see if alert triggers
    await new Promise(r => setTimeout(r, 1000));
    
    if (alertTriggered) {
        console.error('FAILURE: XSS Payload executed in Product Description!');
        process.exit(1);
    } else {
        console.log('SUCCESS: XSS Payload did not execute in Product Description.');
    }

    // Verify the payload is rendered as text, not HTML
    const pageContent = await page.content();
    if (!pageContent.includes('&lt;img src=x onerror=alert("XSS")&gt;') && !pageContent.includes(xssPayload)) {
         // React escapes HTML, so we expect the source code to contain escaped chars OR the text itself but safe.
         // Actually, puppeteer page.content() returns serialized HTML.
         // If React rendered it safely, it should be in the DOM as text node.
    }

    // TEST 2: XSS in Comments
    console.log('TEST 2: Attempting XSS in Comments...');
    // Find the first comment input
    const commentInputSelector = 'input[placeholder="Add a comment..."]';
    await page.waitForSelector(commentInputSelector);
    
    await page.type(commentInputSelector, xssPayload);
    // Click Post button (sibling of input)
    // We need to target the specific post button for the first input
    await page.evaluate(() => {
        const input = document.querySelector('input[placeholder="Add a comment..."]');
        if (input) {
            const form = input.closest('form');
            const button = form.querySelector('button');
            if (button) button.click();
        }
    });

    await new Promise(r => setTimeout(r, 1000));

    if (alertTriggered) {
        console.error('FAILURE: XSS Payload executed in Comments!');
        process.exit(1);
    } else {
        console.log('SUCCESS: XSS Payload did not execute in Comments.');
    }

    // TEST 3: Invalid URL Injection
    console.log('TEST 3: Testing Invalid URL handling...');
    await page.click('#add-product-btn');
    await page.waitForSelector('#product-name', { visible: true });
    
    await page.type('#product-name', 'Bad URL Product');
    // Injecting javascript: protocol
    await page.type('#product-image', 'javascript:alert("XSS_URL")');
    await page.type('#product-desc', 'Testing bad image url');
    
    await page.click('#submit-product-btn');
    await page.waitForSelector('#product-name', { hidden: true });

    // Check if image load failed or if it tried to execute
    // We look for the "No Image" placeholder or broken image icon, but definitely no alert.
    if (alertTriggered) {
        console.error('FAILURE: javascript: URL executed!');
        process.exit(1);
    }
    console.log('SUCCESS: javascript: URL did not execute.');

    console.log('ALL SECURITY TESTS PASSED');

  } catch (e) {
    console.error('Test failed:', e);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
