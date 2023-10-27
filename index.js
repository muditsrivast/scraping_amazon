const express = require('express');
const http = require('http');
const puppeteer = require('puppeteer');
const fsp = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const app = express(http);

app.get('/', async ( req , res) => {
    console.log("working on it");
    const productName = req.query.product;
    if (!productName) {
        return res.status(400).json({ error: 'No Product name is given kindly provide it.' });
    }
    try {
        
        const linkToFolder = await scrapeAmazonProduct(productName);
        res.status(200).json({message : `DONE...Please go to  ./${productName}  the for results`});
    } catch (error) {
        res.status(500).json(error, { error:'error', message : error.message});
    }
});


async function scrapeAmazonProduct(productName) {
    // Launching a browser and a new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const productFolder = `./${productName}`;
        await fsp.mkdir(productFolder, { recursive: true });
    try {
      // Going to amazon and typing the product name and submitting
    await page.goto('https://www.amazon.in', {timeout: 10000 });
    await page.waitForSelector('#twotabsearchtextbox', {timeout: 7000});
    await page.type('#twotabsearchtextbox', productName);
    await page.click('input.nav-input[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' }); // Waiting for page to load
  
      // Wait for search results to load
    await page.waitForSelector('div[data-component-type="s-search-result"] h2 a');
  
      // Get product link
      const productLink = await page.$('div[data-component-type="s-search-result"] h2 a');

      // Click on the first product link
        const productUrl = await page.evaluate(link => link.href, productLink);

        // Going to link because in clicking it is opening in new tab
        await page.goto(productUrl, { waitUntil: 'domcontentloaded' });
    

      const screenshotPath = `${productFolder}/${uuidv4()}.png`;
      const htmlFilePath = `${productFolder}/${uuidv4()}.html`;
      await page.screenshot({ path: screenshotPath });
      const htmlContent = await page.content();
      await fsp.writeFile(htmlFilePath, htmlContent);

      console.log('Product data successfully scraped and stored.');
      return productFolder;
    } catch (err) {
      console.error('Error occurred while scraping:', err);
    } finally {
      await browser.close();
    }
  }
  

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on http://localhost:${5000}`);
});