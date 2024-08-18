import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/slices/bookSlice";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (error) return <p>Error: {error.message || "Failed to fetch books."}</p>;

  const booksToDisplay = books.filter((book) =>
    selectedGenre ? book.genres.includes(selectedGenre) : true
  );

  return (
    <div className="container">
      <h1>Books</h1>

      {booksToDisplay.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <>
          <div className="filter">
            <label htmlFor="genreFilter">Filter by Genre:</label>
            <select
              id="genreFilter"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              {Array.from(new Set(books.flatMap((book) => book.genres))).map(
                (genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                )
              )}
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
                  <strong>Publication Year:</strong>{" "}
                  {book.yearPublished || "N/A"}
                </p>
                <p>
                  <strong>Genres:</strong> {book.genres.join(", ") || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Books;
