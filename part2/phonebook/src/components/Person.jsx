import PropTypes from "prop-types";

const Person = ({ array, onDelete }) => {
  return (
    <div>
      {array.length === 0 ? (
        <p className="no-contacts">
          <i>No contacts available. Hint: Add one.</i>
        </p>
      ) : (
        array.map((person) => (
          <div key={person.id} className="person-item">
            <ul className="person-info">
              <li>Name: {person.name} </li>
              <li className="person-number">Number: {person.number}</li>
            </ul>
            <button
              className="button delete"
              type="button"
              onClick={() => onDelete(person.id)}
              aria-label={`Delete ${person.name}`}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

Person.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Person;
