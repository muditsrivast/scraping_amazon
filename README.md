# Amazon Product Scraper

Amazon product scraper using Node.js and Puppeteer.

# Setup

1. Clone the repository into your machine<br>
2. Navigate to the root project directory.<br>
3. Install the necessary dependencies used by running command
   <pre>npm install</pre><br>
4. Run the code by running the command <pre> node index.js </pre> on the terminal window.<br>
5. Go to the browser and use the end-point <pre> http://localhost:5000?product=product_name </pre><br>
6. Replace the <pre> product_name </pre> with the desired product you want to scrape from Amazon.<br>


# Flow of code
1. After calling the endpoint <pre> http://localhost:5000?product=product_name </pre> scrapping function will be called for provided product name.<br>
2. Launch of the new instances of browser and page.<br>
3. Create the new directory with product name if does not exist.<br>
4. Go to website, type the product name in the searchbar and press submit.<br>
5. Get the product and click on the first product in the result.<br>
6. Store the screenshot and HTML into the folder created.<br>


# Output
- Screenshots of the product page will be saved in the "productName" folder. 
- HTML content of the product page will be saved in the "productName" folder.