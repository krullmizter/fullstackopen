import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../graphql/queries";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  padding: 8px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableData = styled.td`
  text-align: center;
`;

const Books = () => {
  const { loading, error, data } = useQuery(ALL_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.allBooks || data.allBooks.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div>
      <h2>Books</h2>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>Title</TableHeader>
            <TableHeader>Author</TableHeader>
            <TableHeader>Published</TableHeader>
            <TableHeader>Genres</TableHeader>
          </tr>
        </thead>
        <tbody>
          {data.allBooks.map((book) => (
            <TableRow key={book.title}>
              <TableData>{book.title}</TableData>
              <TableData>{book.author}</TableData>
              <TableData>{book.published || "N/A"}</TableData>
              <TableData>{"N/A"}</TableData>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default Books;
