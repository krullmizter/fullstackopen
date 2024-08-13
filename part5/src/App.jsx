import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import {
  getToken,
  removeToken,
  removeUser,
  setUser,
  getUser,
  setToken,
} from "./utils/localStorage";
import { loginUser } from "./services/userService";

function App() {
  const [notification, setNotification] = useState(null);
  const [user, setUserState] = useState(null);

  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();
    if (token && storedUser && storedUser.id) {
      setUserState(storedUser);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const { token, user } = await loginUser(credentials);
      setToken(token);
      setUserState(user);
      setUser(user);
      setNotification({ message: "Login successful", type: "success" });
    } catch (error) {
      setNotification({ message: "Login failed", type: "error" });
      throw error;
    }
  };

  const handleLogout = () => {
    removeToken();
    removeUser();
    setUserState(null);
    setNotification({ message: "Logged out successfully", type: "success" });
  };

  const isLoggedIn = !!user;

  return (
    <Router>
      <div>
        <h1>Blog List | Part 5</h1>
        {isLoggedIn && (
          <nav>
            <Link to="/">Home</Link>
            <Link to="/new-blog">New Blog</Link>
            <button onClick={handleLogout} className="logoutBtn">
              Logout
            </button>
          </nav>
        )}
        <Notification
          notification={notification}
          clearNotification={() => setNotification(null)}
        />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route
                path="/"
                element={<BlogList setNotification={setNotification} />}
              />
              <Route
                path="/new-blog"
                element={
                  <NewBlogForm
                    setNotification={setNotification}
                    onBlogCreated={() => {
                      setNotification({
                        message: "Blog created successfully",
                        type: "success",
                      });
                    }}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <Route
              path="/"
              element={
                <LoginForm
                  handleLogin={handleLogin}
                  setNotification={setNotification}
                />
              }
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
