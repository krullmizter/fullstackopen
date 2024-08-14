import useField from "./hooks/useField";
import useResource from "./hooks/useResource";
import "./styles.css";

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.reset();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    name.reset();
    number.reset();
  };

  return (
    <div className="app-container">
      <h1>Notes & People</h1>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="note-content">Content:</label>
          <input
            id="note-content"
            type={content.type}
            value={content.value}
            onChange={content.onChange}
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">
          Add note
        </button>
      </form>
      <div>
        {notes.map((n) => (
          <p key={n.id} className="note-item">
            {n.content}
          </p>
        ))}
      </div>

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="person-name">Name:</label>
          <input
            id="person-name"
            type={name.type}
            value={name.value}
            onChange={name.onChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="person-number">Number:</label>
          <input
            id="person-number"
            type={number.type}
            value={number.value}
            onChange={number.onChange}
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">
          Add person
        </button>
      </form>
      <div>
        {persons.map((p) => (
          <p key={p.id} className="person-item">
            {p.name} - {p.number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
