import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "@graphql/mutations";
import { ALL_AUTHORS } from "@graphql/queries";
import { fetchAuthors } from "../../redux/slices/authorSlice";

const BirthYear = () => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const authors = useSelector((state) => state.authors.list || []);
  const dispatch = useDispatch();

  const [editAuthor, { loading }] = useMutation(EDIT_AUTHOR, {
    update(cache, { data: { editAuthor } }) {
      const { allAuthors } = cache.readQuery({ query: ALL_AUTHORS });
      cache.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: allAuthors.map((author) =>
            author.name === editAuthor.name
              ? { ...author, born: editAuthor.born }
              : author
          ),
        },
      });
    },
    onCompleted: () => {
      dispatch(fetchAuthors());
      setName("");
      setBirthYear("");
      alert("Author updated successfully!");
    },
    onError: (err) => {
      console.error(err.message);
      alert("Failed to update author.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const year = parseInt(birthYear, 10);
    if (
      !name ||
      !birthYear ||
      isNaN(year) ||
      year < 1000 ||
      year > new Date().getFullYear()
    ) {
      alert("Please select an author and enter a valid birth year.");
      return;
    }
    editAuthor({ variables: { name, setBornTo: year } });
  };

  return (
    <div className="form-container">
      <h2>Change Author Birth Year</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Author</label>
          <select
            id="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            disabled={loading}
          >
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="birthYear">New Birth Year</label>
          <input
            id="birthYear"
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Author"}
        </button>
      </form>
    </div>
  );
};

export default BirthYear;
