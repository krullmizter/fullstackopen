import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      id
      title
      yearPublished
      author {
        name
        born
        bookCount
      }
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
