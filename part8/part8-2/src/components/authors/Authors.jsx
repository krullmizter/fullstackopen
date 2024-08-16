import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "@graphql/queries";
import { setAuthors } from "../../redux/actions/authActions";
import BirthYear from "./BirthYear";

const Authors = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.auth.authors || []);
  const displayedAuthors = useMemo(() => authors, [authors]);

  const { data, loading, error } = useQuery(ALL_AUTHORS);

  useEffect(() => {
    if (data && data.allAuthors) {
      dispatch(setAuthors(data.allAuthors));
    }
  }, [data, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h2>Authors</h2>
      <div className="cards">
        {displayedAuthors.map((author) => (
          <div key={author.name} className="card">
            <h2>{author.name}</h2>
            <div>Born: {author.born ? author.born : "NA"}</div>
            <div>Books: {author.bookCount}</div>
          </div>
        ))}
      </div>
      {user ? <BirthYear /> : null}
    </div>
  );
};

export default Authors;
