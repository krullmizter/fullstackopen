import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int
  }

  type Book {
    id: ID!
    title: String!
    yearPublished: Int!
    author: Author!
    genres: [String!]!
  }

  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
    user: User
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    loggedInUser: User
    recommendedBooks: [Book!]!
  }

  type Mutation {
    registerUser(
      username: String!
      favoriteGenre: String!
      password: String!
    ): User

    loginUser(username: String!, password: String!): Token

    addBook(
      title: String!
      author: String!
      yearPublished: Int!
      genres: [String!]
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;
