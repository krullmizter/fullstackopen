import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@graphql/mutations";
import { loginSuccess } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const { user, value } = data.loginUser;
      localStorage.setItem("auth-token", value);
      dispatch(loginSuccess(user, value));
      navigate("/authors");
    },
    onError: (err) => {
      console.error(err.message);
      alert("Login failed. Please check your credentials.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username *</label>
          <input
            id="username"
            type="text"
            value={username}
            required={true}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password *</label>
          <input
            id="password"
            type="password"
            value={password}
            required={true}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
