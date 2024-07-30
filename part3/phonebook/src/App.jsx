import { useState, useEffect, useCallback } from "react";
import "./assets/App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import personService from "./services/personService";
import Notification from "./components/Notification";

const TIMEOUT = 8000;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  useEffect(() => {
    personService
      .getAll()
      .then(setPersons)
      .catch((error) =>
        handleNotification(
          "error",
          `Failed to fetch contacts: ${error.message}`
        )
      );
  }, []);

  const handleNotification = useCallback((type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: null, message: null }), TIMEOUT);
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleNameSearch = useCallback(
    (e) => {
      const searchValue = e.target.value.toLowerCase();
      setSearchName(searchValue);
      setFilteredSuggestions(
        persons.filter((person) =>
          person.name.toLowerCase().includes(searchValue)
        )
      );
    },
    [persons]
  );

  const validateInputs = () => {
    if (newName.trim() === "" || newNumber.trim() === "") {
      handleNotification(
        "error",
        "Name and phone number fields cannot be empty"
      );
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
            handleNotification(
              "success",
              `Updated the phone number of ${newPerson.name}`
            );
          })
          .catch((error) =>
            handleNotification(
              "error",
              `Error updating contact: ${error.message}`
            )
          );
      }
    } else {
      personService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons((prev) => [...prev, createdPerson]);
          resetForm();
          handleNotification("success", `Added ${newPerson.name}`);
        })
        .catch((error) =>
          handleNotification("error", `Error adding contact: ${error.message}`)
        );
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
          handleNotification("success", `${person.name} was deleted`);
        })
        .catch((error) =>
          handleNotification(
            "error",
            `Error deleting ${person.name}: ${error.message}`
          )
        );
    }
  };

  return (
    <main>
      {notification.message && (
        <Notification type={notification.type} message={notification.message} />
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
