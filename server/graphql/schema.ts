export const typeDefs = `#graphql
  # Book type definition
  type Book {
    id: ID!
    title: String!
    author: String!
    year: Int!
  }

  # Query type definition
  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  # Error type for better error handling
  type Error {
    message: String!
  }
`;
