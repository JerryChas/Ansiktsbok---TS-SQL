export const typeDefs = `#graphql
type User {
id: ID!
name: String!
email: String!
## <------Relatives------->
# posts: [Post!]
}
type Post {
  id: ID!
  title: String!
  description: String!
  user_id: Int! # behövs denna? JA!!!
  created_at: String! # Representerar TIMESTAMP som en ISO 8601-sträng
  nsfw: Boolean!
## <------Relatives------->
  # user: User!
}
## <-------------------------------Queries -------------------------->
type Query {
users: [User!]
user(id: ID!): User
posts: [Post!]
post(id: ID!): Post
}
## <-------------------------------Mutations -------------------------->
type Mutation {
  # User--
createUser(user: UserInput!): User
updateUser(id: ID!, edits: EditInput!): User
deleteUser(id: ID!): User
  # Post--
createPost(post: PostInput!): Post
updatePost(id: ID!, edits: EditPostInput!): Post
deletePost(id: ID!): Post
}
input UserInput {
name: String!
email: String!
}
input EditInput  {
  name: String
  email: String
}

input PostInput {
  title: String!
  description: String!
  user_id: Int!
  nsfw: Boolean!
}
input EditPostInput {
  title: String
  description: String
  nsfw: Boolean
}

`;
