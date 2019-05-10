#! /usr/bin/env node

const fs = require('fs');
const fetchSchema = require('../fetchSchema');
const AirtableGraphQL = require('../index');
const program = require('commander');

program
  .command('pull')
  .option('-b --base [id]')
  .option('-e --email [email]')
  .option('-p --password [password]')
  .action(function (cmd) {
    fetchSchema({
      base: cmd.base,
      email: cmd.email,
      password: cmd.password
    }).then(schema => {
      fs.writeFileSync('./schema.json', JSON.stringify(schema, null, 2), 'utf-8'); 
    })
  });

program
  .command('start')
  .option('-s --schema [path]', 'Path of the file containing Airtable schema', './schema.json')
  .option('-p --port [port]', 'Port for the adapter to listen on', '8765')
  .action(function (cmd) {
    const api = new AirtableGraphQL(process.env.AIRTABLE_API_KEY, {schemaPath: cmd.schema});
    api.listen({port: cmd.port}).then(() => console.log('done')).catch((e) => console.log(e));
  });

program.parse(process.argv);