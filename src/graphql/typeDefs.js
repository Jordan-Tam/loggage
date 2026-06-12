export const typeDefs = `#graphql
type User {
    _id: String
    testStrings: [String]
}

type Query {
    ping: String!
}

type Mutation {
    addTestString(_id: String!, testString: String!): User
}
`