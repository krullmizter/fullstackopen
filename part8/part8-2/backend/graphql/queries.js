import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
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

export const RECOMMENDED_BOOKS = gql`
  query {
    recommendedBooks {
      id
      title
      yearPublished
      author {
        name
        born
      }
      genres
    }
  }
`;
