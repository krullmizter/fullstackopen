import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      user {
        id
        username
        favoriteGenre
      }
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $password: String!
    $favoriteGenre: String!
  ) {
    registerUser(
      username: $username
      password: $password
      favoriteGenre: $favoriteGenre
    ) {
      user {
        id
        username
        favoriteGenre
      }
      token
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $yearPublished: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      yearPublished: $yearPublished
      genres: $genres
    ) {
      id
      title
      author {
        id
        name
      }
      yearPublished
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
