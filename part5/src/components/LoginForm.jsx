import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ handleLogin, setNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setNotification({
        message: "Fill in both username and password",
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      await handleLogin({ username, password });
    } catch (error) {
      setNotification({ message: "Login failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading || !username || !password}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default LoginForm;
