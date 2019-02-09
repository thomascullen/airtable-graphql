const graphql = require("graphql");

module.exports = airtableGraphql => {
  airtableGraphql.addColumnSupport("number", {
    graphqlType: column => {
      if (column.options.format === "decimal") {
        return { type: graphql.GraphQLFloat };
      }

      if (column.options.format === "currency") {
        return { type: graphql.GraphQLString };
      }

      if (column.options.format === "percent") {
        return { type: graphql.GraphQLString };
      }

      if (column.options.format === "duration") {
        return { type: graphql.GraphQLString };
      }

      return { type: graphql.GraphQLInt };
    },

    resolver: (column, api) => (obj) => {
      let value = obj.fields[column.name];

      if (column.options.format === "currency") {
        value = `${column.options.symbol}${value}`;
      }

      if (column.options.format === "percent") {
        value = `${value}%`;
      }

      return value;
    }
  });
};
