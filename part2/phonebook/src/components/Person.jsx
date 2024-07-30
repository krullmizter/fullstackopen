/* eslint-disable react/prop-types */
const Person = ({ array, onDelete }) => {
  return (
    <div>
      <div>
        {array.map((person) => (
          <>
            <p key={person.id}>
              {person.name} <span>{person.number}</span>
            </p>
            <button onClick={() => onDelete(person.id)}>Delete</button>{" "}
          </>
        ))}
      </div>
    </div>
  );
};

export default Person;
