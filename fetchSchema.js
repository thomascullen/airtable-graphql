const puppeteer = require("puppeteer");

function removeForeignTables(obj) {
  console.log(typeof obj);
  if (typeof obj === 'object') {
    let result = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && key !== 'foreignTable') {
        result[key] = removeForeignTables(obj[key]);
      }
    }
    if (Array.isArray(obj)) {
      {
        let arrayResult = [];
        for (let i = 0; i < obj.length; i++) {
          arrayResult.push(result[String(i)]);
        }
        result = arrayResult;
      }
    }
    return result;
  } else {
    return obj;
  }
}

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
    return removeForeignTables(application);
  });
  await browser.close();
  return {
    id: config.base,
    ...schema
  };
};
