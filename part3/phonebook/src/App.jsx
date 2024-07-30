import { useState, useEffect } from "react";
import "./assets/App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import personService from "./services/personService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(setPersons)
      .catch((error) => handleError("Failed to fetch contacts", error));
  }, []);

  const handleError = (message, error) => {
    console.error(error);
    setErrorMessage(`${message}: ${error.message}`);
    setTimeout(() => setErrorMessage(null), 8000);
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleNameSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchName(searchValue);

    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(searchValue)
    );
    setFilteredSuggestions(filtered);
  };

  const validateInputs = () => {
    if (newName.trim() === "" || newNumber.trim() === "") {
      setErrorMessage("Name and phone number fields cannot be empty");
      return false;
    }
    return true;
  };

  const addPerson = () => {
    if (!validateInputs()) return;

    const newPerson = { name: newName.trim(), number: newNumber.trim() };

    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.trim().toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newPerson.name} is already in the phonebook. Replace the old number with a new one?`
        )
      ) {
        personService
          .update(existingPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons((prev) =>
              prev.map((p) => (p.id !== existingPerson.id ? p : updatedPerson))
            );
            resetForm();
            setSuccessMessage(`Updated ${newPerson.name}'s number`);
            setTimeout(() => setSuccessMessage(null), 8000);
          })
          .catch((error) => handleError("Error updating contact", error));
      }
    } else {
      personService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons((prev) => [...prev, createdPerson]);
          resetForm();
          setSuccessMessage(`Added ${newPerson.name}`);
          setTimeout(() => setSuccessMessage(null), 8000);
        })
        .catch((error) => handleError("Error adding contact", error));
    }
  };

  const resetForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons((prev) => prev.filter((p) => p.id !== id));
          setSuccessMessage(`${person.name} deleted`);
          setTimeout(() => setSuccessMessage(null), 8000);
        })
        .catch((error) => handleError("Error deleting contact", error));
    }
  };

  return (
    <main>
      {errorMessage && <Notification type="error" message={errorMessage} />}
      {successMessage && (
        <Notification type="success" message={successMessage} />
      )}

      <section>
        <h1>Phonebook</h1>
        <Filter
          inputPlaceholder="Search by name..."
          filterValue={searchName}
          filterChange={handleNameSearch}
          filterSuggestions={filteredSuggestions}
        />
      </section>

      <section>
        <h2>Add a new contact</h2>
        <PersonForm
          onSubmit={addPerson}
          nameValue={newName}
          nameOnChange={handleNameChange}
          numberValue={newNumber}
          numberOnChange={handleNumberChange}
        />
      </section>

      <section>
        <h2>Contacts</h2>
        <Person array={persons} onDelete={deletePerson} />
      </section>
    </main>
  );
};

export default App;
