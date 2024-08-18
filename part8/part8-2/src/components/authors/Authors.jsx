import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuthors } from "../../redux/slices/authorSlice";
import { selectAuthors, selectError } from "../../redux/slices/authorSlice";
import BirthYear from "./BirthYear";

const Authors = () => {
  const user = useSelector((state) => state.auth.user);
  const authors = useSelector(selectAuthors);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  if (error) return <p>Error: {error.message || "Failed to fetch authors."}</p>;
  if (!authors) return <p>Loading authors...</p>;

  return (
    <div className="container">
      <h1>Authors</h1>
      {authors.length === 0 ? (
        <p>No authors found.</p>
      ) : (
        <div className="cards">
          {authors.map((author) => (
            <div key={author.id} className="card">
              <h2>{author.name}</h2>
              <div>Born: {author.born ? author.born : "Unknown"}</div>
              <div>Books: {author.bookCount}</div>
            </div>
          ))}
        </div>
      )}
      {user && <BirthYear />}
    </div>
  );
};

export default Authors;
