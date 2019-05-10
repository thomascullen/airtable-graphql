const puppeteer = require("puppeteer");

module.exports = async config => {
  console.log("Fetching schema...");
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto(`https://airtable.com/${config.base}/api/docs`);
  await page.type("*[name=email]", config.email);
  await page.type("*[name=password]", config.password);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  const schema = await page.evaluate(() => {
    return application;
  });
  await browser.close();
  return {
    id: config.base,
    ...schema
  };
};
