/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";

const PersonForm = ({
  onSubmit,
  nameValue,
  nameOnChange,
  numberValue,
  numberOnChange,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form className="personForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name-input">
          Name
          <br />
          <input
            id="name-input"
            required
            type="text"
            value={nameValue}
            onChange={nameOnChange}
            placeholder="Enter name"
            aria-label="Name"
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="number-input">
          Phone number
          <br />
          <input
            id="number-input"
            required
            type="tel"
            value={numberValue}
            onChange={numberOnChange}
            placeholder="Enter phone number"
            aria-label="Phone number"
          />
        </label>
      </div>
      <button className="button" type="submit">
        Add/Update Contact
      </button>
    </form>
  );
};

export default PersonForm;
