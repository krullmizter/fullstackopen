import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]
  }

  type Query {
    allAuthors: [Author!]!
    allBooks: [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;
