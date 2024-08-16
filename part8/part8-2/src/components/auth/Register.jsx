import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@graphql/mutations";
import { registerSuccess } from "../../redux/actions/authActions";

const Register = () => {
  const [username, setUsername] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      const user = { username, favoriteGenre };
      dispatch(registerSuccess(user));
      alert("User registered successfully!");
    },
    onError: (err) => {
      console.error(err.message);
      alert("An error occurred while registering.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({ variables: { username, favoriteGenre, password } });
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
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
          <label htmlFor="favoriteGenre">Favorite Genre *</label>
          <input
            id="favoriteGenre"
            type="text"
            value={favoriteGenre}
            required={true}
            onChange={({ target }) => setFavoriteGenre(target.value)}
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
