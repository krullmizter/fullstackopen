import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../graphql/queries";
import { SET_BIRTH_YEAR } from "../graphql/mutations";
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

const Select = styled.select`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
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

const BirthYear = () => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(SET_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (err) => {
      console.error(err.message);
      alert("An error occurred while updating the author's information.");
    },
    onCompleted: () => {
      alert("Author's birth year updated successfully!");
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const submit = async (event) => {
    event.preventDefault();
    if (!name || !born) {
      alert("Select an author and enter a birth year.");
      return;
    }

    try {
      await editAuthor({ variables: { name, born: parseInt(born, 10) } });
      setName("");
      setBorn("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormContainer>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <FormGroup>
          <Label htmlFor="author">Author</Label>
          <Select
            id="author"
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option value="">Select author</option>
            {data.allAuthors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="born">Born</Label>
          <Input
            id="born"
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            min="0"
          />
        </FormGroup>
        <Button type="submit">Update the birth year</Button>
      </form>
    </FormContainer>
  );
};

export default BirthYear;
