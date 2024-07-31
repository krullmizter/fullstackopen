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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="name-input">
            Name
            <br />
            <input
              id="name-input"
              name="newName" // Added name attribute
              required
              type="text"
              value={nameValue}
              onChange={nameOnChange}
              placeholder="Enter name"
              aria-label="Name"
            />
          </label>
        </div>
        <div className="input-container">
          <label htmlFor="number-input">
            Phone number
            <br />
            <input
              id="number-input"
              name="newNumber" // Added name attribute
              required
              type="tel"
              value={numberValue}
              onChange={numberOnChange}
              placeholder="Enter phone number"
              aria-label="Phone number"
            />
          </label>
        </div>
        <button className="button button--submit" type="submit">
          Add/Update Contact
        </button>
      </form>
    </div>
  );
};

PersonForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  nameValue: PropTypes.string.isRequired,
  nameOnChange: PropTypes.func.isRequired,
  numberValue: PropTypes.string.isRequired,
  numberOnChange: PropTypes.func.isRequired,
};

export default PersonForm;
