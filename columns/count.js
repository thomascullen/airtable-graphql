const graphql = require('graphql');

module.exports = airtableGraphql => {
  airtableGraphql.addColumnSupport("count", {
    graphqlType: column => ({
      type: graphql.GraphQLInt
    })
  })
}