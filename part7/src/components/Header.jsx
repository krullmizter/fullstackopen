import { Link } from "react-router-dom";

const Header = () => {
  const padding = { paddingRight: 5 };
  return (
    <header>
      <h1>Software Anecdotes</h1>
      <Link to="/" style={padding}>
        Anecdotes
      </Link>
      <Link to="/create" style={padding}>
        Create New
      </Link>
      <Link to="/about" style={padding}>
        About
      </Link>
    </header>
  );
};

export default Header;
