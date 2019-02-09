const graphql = require("graphql");

const fetchRecord = (api, table, id) =>
  new Promise((resolve, reject) => {
    api(table).find(id, (err, record) => {
      if (err) {
        reject(err);
      }
      resolve(record);
    });
  });

module.exports = airtableGraphql => {
  airtableGraphql.addColumnSupport("foreignKey", {
    graphqlType: (column, { getTableType }) => {
      if (column.options.relationship === "many") {
        return { type: new graphql.GraphQLList(getTableType(column.options.table)) };
      }
      return {
        type: getTableType(column.options.table)
      };
    },
    resolver: (column, api) => (obj, args, context, info) => {
      const ids = obj.fields[column.name];
      if (column.options.relationship === "one") {
        if (!ids) return null;
        return new Promise((resolve, reject) => {
          api(column.options.table).find(ids[0], (err, record) => {
            if (err) {
              reject(err);
            }
            resolve(record);
          });
        });
      }

      if (column.options.relationship === "many") {
        if (!ids) return [];

        return Promise.all(
          ids.map(id => fetchRecord(api, column.options.table, id))
        );
      }
    },
    default: (column, api) => (obj, args, context, info) => {
      return obj.fields[column.name];
    }
  });
};
