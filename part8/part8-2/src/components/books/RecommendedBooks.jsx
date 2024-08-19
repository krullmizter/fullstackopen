import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedBooks } from "../../redux/slices/bookSlice";

const RecommendedBooks = () => {
  const dispatch = useDispatch();
  const recommendedBooks = useSelector((state) => state.books.recommendedBooks);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    dispatch(fetchRecommendedBooks());
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;

  if (!recommendedBooks || recommendedBooks.length === 0) {
    return <p>No recommended books found.</p>;
  }

  return (
    <div className="container">
      <h2>Recommended Books</h2>
      <div className="cards">
        {recommendedBooks.map((book) => (
          <div key={book.id} className="card">
            <h3>{book.title}</h3>
            <p>
              <strong>Genres:</strong> {book.genres.join(", ") || "N/A"}
            </p>
            <p>By: {book.author.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedBooks;
