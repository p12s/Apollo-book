export const typeDefs = `#graphql
  # Book type definition
  type Book {
    id: ID!
    title: String!
    author: String!
    year: Int!
  }

  # Input type for creating a new book
  input CreateBookInput {
    title: String!
    author: String!
    year: Int!
  }

  # Query type definition
  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  # Mutation type definition
  type Mutation {
    createBook(input: CreateBookInput!): Book!
  }

  # Error type for better error handling
  type Error {
    message: String!
  }
`;