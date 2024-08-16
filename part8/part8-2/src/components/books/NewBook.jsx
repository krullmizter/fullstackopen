import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK } from "@graphql/mutations";
import { ALL_BOOKS } from "@graphql/queries";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [yearPublished, setYearPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    update(cache, { data: { addBook } }) {
      const { allBooks } = cache.readQuery({ query: ALL_BOOKS }) || {
        allBooks: [],
      };
      cache.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: [...allBooks, addBook],
        },
      });
    },
    onError: (err) => {
      console.error(err.message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !author || !yearPublished) {
      alert("Title, author, and published year are required.");
      return;
    }

    addBook({
      variables: {
        title,
        author,
        yearPublished: parseInt(yearPublished, 10),
        genres: genres.length > 0 ? genres : [],
      },
    });
  };

  const handleAddGenre = (event) => {
    event.preventDefault();
    if (genre && !genres.includes(genre)) {
      setGenres((prevGenres) => [...prevGenres, genre]);
      setGenre("");
    }
  };

  return (
    <div className="form-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            value={title}
            required={true}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author *</label>
          <input
            id="author"
            type="text"
            value={author}
            required={true}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="yearPublished">Year Published *</label>
          <input
            id="yearPublished"
            type="number"
            value={yearPublished}
            required={true}
            onChange={({ target }) => setYearPublished(target.value)}
          />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <input
            id="genre"
            type="text"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={handleAddGenre}>Add Genre</button>
        </div>
        <div>
          <ul>
            {genres.map((g, index) => (
              <li key={index}>{g}</li>
            ))}
          </ul>
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default NewBook;
