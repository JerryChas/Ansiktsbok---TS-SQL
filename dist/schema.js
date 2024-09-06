export const typeDefs = `#graphql
type User {
id: ID!
name: String!
email: String!
}
type Query {
users: [User]
user(id: ID!): User
}
type Mutation {
createUser(user: UserInput!): User
}
input UserInput {
name: String!
email: String!
}
`;
