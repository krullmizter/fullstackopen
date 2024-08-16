import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Authors from "./components/authors/Authors";
import Books from "./components/books/Books";
import NewBook from "./components/books/NewBook";
import RecommendedBooks from "./components/books/RecommendedBooks";
import BirthYear from "./components/authors/BirthYear";
import LoginForm from "./components/auth/LoginForm";
import Register from "./components/auth/Register";
import { logout, loginSuccess } from "./redux/actions/authActions";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        dispatch(loginSuccess(decodedUser, token));
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("auth-token");
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/authors"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Authors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Books
            </NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink
                  to="/add"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  Add a book
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recommendations"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  Recommendations
                </NavLink>
              </li>
              <li className="nav-logout">
                Logged in as: {user.username}
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommendations" element={<RecommendedBooks />} />
        <Route path="/birth-year" element={<BirthYear />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
