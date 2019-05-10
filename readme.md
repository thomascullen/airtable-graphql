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
$ airtable-graphql pull --email=[your_email] --password=[your_password] --base=[base_id]
```

This will create a `schema.json` file which describes all of your bases tables and columns.

Use the airtable-graphql command to start the adapter

```
$ airtable-graphql start -s schema.json -p 8765
```

Open your browser to localhost:8765 to start writing GraphQL queries against your Airtable data.

That's it!
