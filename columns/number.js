const graphql = require("graphql");

module.exports = airtableGraphql => {
  airtableGraphql.addColumnSupport("number", {
    graphqlType: column => {
      if (column.options.format === "decimal") {
        return { type: graphql.GraphQLFloat };
      }

      if (column.options.format === "currency") {
        return { type: graphql.GraphQLFloat };
      }

      if (column.options.format === "percent") {
        return { type: graphql.GraphQLInt };
      }

      if (column.options.format === "duration") {
        return { type: graphql.GraphQLInt };
      }

      return { type: graphql.GraphQLInt };
    },

    resolver: (column, api) => (obj) => {
      let value = obj.fields[column.name];

      return value;
    }
  });
};
