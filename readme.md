# Airtable GraphQL

Quickly deploy a GraphQL API for an airtable base in just a few lines of code.

```js
const AirtableGraphQL = require("airtable-graphql");
api = new AirtableGraphQL("airtable_api_key");
api.listen();
```

# Setup

```
npm install airtable-graphql --save
```

Pull your airtable schema by running the `airtable-graphql pull` command in the root folder of your project.

```
$ aitable-graphql pull --email=[your_email] --password=[your_password] --base=[base_id]
```

This will create a `schema.json` file which describes all of your bases tables and columns.

Create a file called `index.js` and add the following.

```js
const AirtableGraphQL = require("airtable-graphql");
api = new AirtableGraphQL("airtable_api_key");
api.listen();
```

Run `node index.js`

That's it!