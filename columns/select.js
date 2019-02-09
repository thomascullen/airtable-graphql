const graphql = require('graphql');

module.exports = airtableGraphql => {
  airtableGraphql.addColumnSupport("select", {
    graphqlType: column => ({
      type: graphql.GraphQLString
    })
  })
}