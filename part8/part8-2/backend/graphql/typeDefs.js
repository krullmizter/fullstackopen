import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    favoriteGenre: String
  }

  type Token {
    user: User!
    token: String!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    yearPublished: Int!
    genres: [String!]!
  }

  type Query {
    allAuthors: [Author!]!
    allBooks: [Book!]!
    recommendedBooks: [Book!]!
    me: User
  }

  type Mutation {
    loginUser(username: String!, password: String!): Token
    editAuthor(name: String!, setBornTo: Int!): Author!

    registerUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): Token

    addBook(
      title: String!
      author: String!
      yearPublished: Int!
      genres: [String!]!
    ): Book!
  }
`;
