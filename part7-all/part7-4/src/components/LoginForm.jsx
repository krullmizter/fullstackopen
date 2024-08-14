import React, { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ handleLogin, setNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleLogin({ username, password });
    } catch (error) {
      setNotification({ message: "Invalid credentials", type: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-blog-form">
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default LoginForm;
