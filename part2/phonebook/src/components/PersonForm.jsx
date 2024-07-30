/* eslint-disable react/prop-types */
const PersonForm = ({
  onSubmit,
  nameValue,
  nameOnChange,
  numberValue,
  numberOnChange,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <p>
          <label>
            <span>Name: </span>
            <input value={nameValue} onChange={nameOnChange} />
          </label>
        </p>
        <p>
          <label>
            <span>Phone number: </span>
            <input value={numberValue} onChange={numberOnChange} />
          </label>
        </p>
        <button type="submit">Add contact</button>
      </form>
    </div>
  );
};

export default PersonForm;
