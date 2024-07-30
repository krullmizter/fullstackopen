import { useState } from "react";
import "./assets/App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleNameSearch = (e) => {
    const searchValue = e.target.value;
    setSearchName(searchValue);

    if (searchValue.trim() !== "") {
      const filtered = persons.filter((person) =>
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const addPerson = (e) => {
    e.preventDefault();

    if (newName.trim() === "" || newNumber.trim() === "") {
      alert("Name and number fields cannot be empty");
      return;
    }

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: persons.length + 1,
    };

    if (
      persons.some(
        (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
      )
    ) {
      alert(`${newPerson.name} is already added to the phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <h2>Search contact name</h2>

      <Filter
        inputPlaceholder="contact name"
        filterValue={searchName}
        filterChange={handleNameSearch}
        filterSuggestions={filteredSuggestions}
      />

      <h2>Add a new contact</h2>

      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />

      <h2>Contacts</h2>

      <Person array={persons} />
    </div>
  );
};

export default App;
