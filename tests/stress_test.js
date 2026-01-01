const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting stress test...');
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    console.log('Page loaded');

    // Initial count
    let initialCount = await page.$$eval('.border.rounded-lg', els => els.length);
    console.log(`Initial product count: ${initialCount}`);

    // Add 5 products
    for (let i = 0; i < 5; i++) {
        console.log(`Adding product ${i + 1}...`);
        
        await page.click('#add-product-btn');
        
        await page.waitForSelector('#product-name', { visible: true });
        
        await page.type('#product-name', `Test AI ${i}`);
        await page.type('#product-image', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800');
        await page.type('#product-desc', `Description for test AI ${i}`);
        
        await page.click('#submit-product-btn');
        
        // Wait for modal to close (name input should disappear)
        await page.waitForSelector('#product-name', { hidden: true });

        // Wait for new product text (description is not uppercased)
        try {
            await page.waitForFunction(
                (text) => document.body.innerText.includes(text),
                { timeout: 5000 },
                `Description for test AI ${i}`
            );
        } catch (e) {
            console.error(`Timeout waiting for "Description for test AI ${i}". Dumping body text:`);
            const text = await page.evaluate(() => document.body.innerText);
            console.log(text.substring(0, 500) + '...');
            throw e;
        }
    }

    // Final count
    let finalCount = await page.$$eval('.border.rounded-lg', els => els.length);
    console.log(`Final product count: ${finalCount}`);
    
    if (finalCount === initialCount + 5) {
        console.log('SUCCESS: All 5 products added.');
    } else {
        console.error(`FAILURE: Expected ${initialCount + 5}, got ${finalCount}`);
        process.exit(1);
    }

  } catch (e) {
    console.error('Test failed:', e);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
