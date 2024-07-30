/* eslint-disable react/prop-types */
const Person = ({ array }) => {
  return (
    <div>
      <div>
        {array.map((person) => (
          <p key={person.id}>
            {person.name} <span>{person.number}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Person;
