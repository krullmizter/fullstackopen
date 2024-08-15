import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK } from "../graphql/mutations";
import { ALL_BOOKS, ALL_AUTHORS } from "../graphql/queries";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const GenreList = styled.div`
  margin-top: 10px;
`;

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    if (!title || !author || !published) {
      alert("Title, author, and published year are required.");
      return;
    }

    try {
      await addBook({
        variables: {
          title,
          author,
          published: parseInt(published, 10),
          genres: genres.length > 0 ? genres : [],
        },
      });
      setTitle("");
      setAuthor("");
      setPublished("");
      setGenres([]);
      setGenre("");
      setSuccessMessage("Book added successfully!");
    } catch (err) {
      console.error("Error adding book:", err);
      alert("Failed to add book.");
    }
  };

  const addGenre = (event) => {
    event.preventDefault();
    if (genre) {
      setGenres((prevGenres) => [...prevGenres, genre]);
      setGenre("");
    }
  };

  return (
    <FormContainer>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={submit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="published">Published</Label>
          <Input
            id="published"
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            type="text"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <Button onClick={addGenre} type="button">
            Add Genre
          </Button>
        </FormGroup>

        <GenreList>
          {genres.length > 0
            ? `Genres: ${genres.join(", ")}`
            : "No genres added"}
        </GenreList>

        <Button type="submit">Create Book</Button>
      </form>
    </FormContainer>
  );
};

export default NewBook;
