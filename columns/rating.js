const graphql = require('graphql');

module.exports = airtableGraphql => {
  airtableGraphql.addColumnSupport("rating", {
    graphqlType: column => ({
      type: graphql.GraphQLInt
    })
  })
}