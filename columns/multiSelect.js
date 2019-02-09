const graphql = require('graphql');

module.exports = airtableGraphql => {
  airtableGraphql.addColumnSupport("multiSelect", {
    graphqlType: column => ({
      type: new graphql.GraphQLList(graphql.GraphQLString)
    }),
    resolver: (column, api) => (obj) => {
      return obj.fields[column.name] || []
    }
  })
}