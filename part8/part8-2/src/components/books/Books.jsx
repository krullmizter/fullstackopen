import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "@graphql/queries";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [allGenres, setAllGenres] = useState([]);

  const { data: booksData, loading, error } = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (booksData && booksData.allBooks) {
      const genres = [
        ...new Set(booksData.allBooks.flatMap((book) => book.genres)),
      ];
      setAllGenres(genres);
    }
  }, [booksData]);

  const booksToDisplay = booksData?.allBooks.filter((book) =>
    selectedGenre ? book.genres.includes(selectedGenre) : true
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!booksToDisplay || booksToDisplay.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div className="container">
      <h2>Books</h2>

      <div className="filter">
        <label htmlFor="genreFilter">Filter by Genre:</label>
        <select
          id="genreFilter"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {allGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="cards">
        {booksToDisplay.map((book) => (
          <div key={book.id} className="card">
            <h2 className="card-title">{book.title}</h2>
            <p>
              <strong>Author:</strong> {book.author.name}
            </p>
            <p>
              <strong>Publication Year:</strong> {book.yearPublished || "N/A"}
            </p>
            <p>
              <strong>Genres:</strong> {book.genres.join(", ") || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
