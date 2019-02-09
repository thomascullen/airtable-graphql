const sanitize = require("./sanitize");

  // Takes an airtable schema and returns GraphQL resolvers.
module.exports = (airtableSchema, api, columnSupport) => {
  const fetchRecord = (api, table, id) =>
    new Promise((resolve, reject) => {
      api(table).find(id, (err, record) => {
        if (err) {
          reject(err);
        }
        resolve(record);
      });
    });

  const resolversForTable = (table, api) => {
    return table.columns.reduce((resolvers, column) => {
      let columnBuilder = columnSupport[column.type];
      if (!columnBuilder || !columnBuilder.resolver) {
        columnBuilder = columnSupport['text']
      }
      resolvers[sanitize.toField(column.name)] = columnBuilder.resolver(column, api);
      return resolvers;
    }, {});
  };

  const resolverForAll = (table, api) => () =>
    new Promise((resolve, reject) => {
      let results = [];
      api(table.name)
        .select()
        .eachPage(
          (records, nextPage) => {
            results = [...results, ...records];
            nextPage();
          },
          err => {
            resolve(results);
          }
        );
    });

  const resolverForSingle = (table, api) => (_, args) => {
    return fetchRecord(api, table.name, args.id);
  };
  const resolvers = {
    Query: {}
  };

  resolvers.Query.tables = () => {
    return airtableSchema.tables.map(t => t.name);
  };

  airtableSchema.tables.forEach(table => {
    const all = sanitize.plural(sanitize.toField(table.name));
    resolvers.Query[all] = resolverForAll(table, api);

    const single = sanitize.singular(sanitize.toField(table.name));
    resolvers.Query[single] = resolverForSingle(table, api);

    const typeName = sanitize.toType(table.name);
    resolvers[typeName] = resolversForTable(table, api);
  });

  return resolvers;
};
