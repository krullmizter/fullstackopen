import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $favoriteGenre: String!
    $password: String!
  ) {
    registerUser(
      username: $username
      favoriteGenre: $favoriteGenre
      password: $password
    ) {
      id
      username
      favoriteGenre
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      user {
        id
        username
        favoriteGenre
      }
      value
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $yearPublished: Int!
    $genres: [String!]
  ) {
    addBook(
      title: $title
      author: $author
      yearPublished: $yearPublished
      genres: $genres
    ) {
      title
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
