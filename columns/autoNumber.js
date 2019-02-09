const graphql = require('graphql');

module.exports = airtableGraphql => {
  airtableGraphql.addColumnSupport("autoNumber", {
    graphqlType: column => ({
      type: graphql.GraphQLInt
    })
  })
}