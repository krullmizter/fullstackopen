import { useQuery } from "@apollo/client";
import { RECOMMENDED_BOOKS } from "@graphql/queries";

const RecommendedBooks = () => {
  const { data, loading, error } = useQuery(RECOMMENDED_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data.recommendedBooks || data.recommendedBooks.length === 0) {
    return <p>No recommended books found.</p>;
  }

  return (
    <div className="container">
      <h2>Recommended Books</h2>
      <div className="cards">
        {data.recommendedBooks.map((book) => (
          <div key={book.id} className="card">
            <h3>{book.title}</h3>
            <p>By: {book.author.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedBooks;
