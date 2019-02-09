const graphql = require('graphql');

module.exports = airtableGraphql => {
  airtableGraphql.addColumnSupport("checkbox", {
    graphqlType: column => ({
      type: graphql.GraphQLBoolean
    }),
    resolver: (column, api) => (obj) => {
      return obj.fields[column.name] || false
    }
  })
}