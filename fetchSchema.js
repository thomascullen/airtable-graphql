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
    return {
      tables: application.tables.map(table => ({
        name: table.name,
        columns: table.columns.map(column => {
          let options = {};

          if (column.type === "select") {
            options = {
              choices: Object.values(column.typeOptions.choices).map(c => {
                return c.name;
              })
            };
          }

          if (column.type === 'foreignKey') {
            options = {
              relationship: column.typeOptions.relationship,
              table: column.foreignTable.name
            }
          }

          if (column.type === 'multiSelect') {
            options = {
              choices: Object.values(column.typeOptions.choices).map(c => {
                return c.name
              })
            }
          }

          if (column.type === 'number') {
            options = {
              format: column.typeOptions.format
            }
          }

          if (column.type === 'number') {
            options = {
              format: column.typeOptions.format
            }
          }

          return {
            name: column.name,
            type: column.type,
            options: options
          }
        })
      }))
    };
  });
  await browser.close();
  return {
    id: config.base,
    ...schema
  };
};
