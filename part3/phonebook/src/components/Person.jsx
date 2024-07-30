/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";

const Person = ({ array = [], onDelete }) => {
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

export default Person;
