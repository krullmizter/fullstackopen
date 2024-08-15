import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Authors from "../src/components/Authors";
import Books from "../src/components/Books";
import NewBook from "../src/components/NewBook";
import BirthYear from "../src/components/BirthYear";
import styled from "styled-components";

const NavContainer = styled.nav`
  background-color: #f4f4f4;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 15px;
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const App = () => {
  return (
    <Router>
      <div>
        <NavContainer>
          <NavList>
            <NavItem>
              <NavLink to="/authors">Authors</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/books">Books</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/add">Add a book</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/birth-year">Set a birth year</NavLink>
            </NavItem>
          </NavList>
        </NavContainer>
        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook />} />
          <Route path="/birth-year" element={<BirthYear />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
