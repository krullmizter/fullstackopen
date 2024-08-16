import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "@graphql/mutations";
import { ALL_AUTHORS } from "@graphql/queries";

const BirthYear = () => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const authors = useSelector((state) => state.auth.authors || []);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: () => {
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
    if (!name || !birthYear) {
      alert("Please select an author and enter a birth year.");
      return;
    }
    editAuthor({ variables: { name, setBornTo: parseInt(birthYear, 10) } });
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
          >
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
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
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default BirthYear;
