// This file is responsible for taking an airtable schema object and converting
// it into a GraphQL schema object.
const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  ...graphql
} = require("graphql");
const sanitize = require("./sanitize");

module.exports = (airtableSchema, columnSupport) => {
  const TYPES = [];

  const queryType = {
    name: "Query",
    fields: {}
  };

  const getTableType = name => TYPES[name];

  // Add query field for all tables
  queryType.fields.tables = {
    type: new GraphQLList(GraphQLString)
  };

  airtableSchema.tables.forEach(table => {
    TYPES[table.name] = new GraphQLObjectType({
      name: sanitize.toType(table.name),
      fields: () => ({
        id: { type: GraphQLID },
        ...table.columns.reduce((columns, column) => {
          const typeBuilder =
            columnSupport[column.type] || columnSupport["text"];

          const fieldName = sanitize.toField(column.name);
          columns[fieldName] = typeBuilder.graphqlType(column, {
            getTableType
          });
          return columns;
        }, {})
      })
    });

    const all = sanitize.plural(sanitize.toField(table.name));
    queryType.fields[all] = {
      type: new GraphQLList(TYPES[table.name])
    };

    const single = sanitize.singular(sanitize.toField(table.name));
    queryType.fields[single] = {
      type: TYPES[table.name],
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      }
    };
  });

  return new GraphQLSchema({
    query: new GraphQLObjectType(queryType)
  });
};
