import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import store from "./store";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import { setUser, clearUser } from "./reducers/userReducer";
import {
  setNotification,
  clearNotification,
} from "./reducers/notificationReducer";
import {
  getToken,
  removeToken,
  getUser,
  setUser as setLocalUser,
  setToken,
} from "./utils/localStorage";
import { loginUser } from "./services/userService";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const token = getToken();
    const storedUser = getUser();
    if (token && storedUser && storedUser.id) {
      dispatch(setUser(storedUser));
    }
  }, [dispatch]);

  const handleLogin = async (credentials) => {
    try {
      const { token, user } = await loginUser(credentials);
      setToken(token);
      dispatch(setUser(user));
      setLocalUser(user);
      dispatch(
        setNotification({ message: "Login successful", type: "success" })
      );
    } catch (error) {
      dispatch(setNotification({ message: "Login failed", type: "error" }));
      throw error;
    }
  };

  const handleLogout = () => {
    removeToken();
    setLocalUser(null);
    dispatch(clearUser());
    dispatch(
      setNotification({ message: "Logged out successfully", type: "success" })
    );
  };

  const isLoggedIn = !!user;

  return (
    <Router>
      <Notification
        notification={notification}
        clearNotification={() => dispatch(clearNotification())}
      />
      <header>
        <h1>Blog List | Part 7</h1>
        {isLoggedIn && (
          <nav>
            <Link to="/">Home</Link>
            <Link to="/new-blog">Add Blog</Link>
            <button onClick={handleLogout} className="logoutBtn">
              Logout
            </button>
          </nav>
        )}
      </header>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<BlogList />} />
            <Route
              path="/new-blog"
              element={
                <NewBlogForm
                  onBlogCreated={() =>
                    dispatch(
                      setNotification({
                        message: "Blog created successfully",
                        type: "success",
                      })
                    )
                  }
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
                setNotification={(notification) =>
                  dispatch(setNotification(notification))
                }
              />
            }
          />
        )}
      </Routes>
    </Router>
  );
};

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
