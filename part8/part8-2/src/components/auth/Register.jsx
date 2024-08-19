import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/authSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, password, favoriteGenre }));
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
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
