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
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        handleError(
          "Failed to fetch contacts from server. Hint: Start the backend.",
          error
        );
      });
  }, []);

  const handleError = (message, error) => {
    console.error("Error:", error.message);
    if (error.response) {
      console.warn(
        `Response error: ${error.response.data || error.response.statusText}`
      );
    } else if (error.request) {
      console.warn(`Request error: ${error.request}`);
    }

    setErrorMessage(`${message}: ${error.message}`);
    setTimeout(() => setErrorMessage(null), 8000);
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleNameSearch = (e) => {
    const searchValue = e.target.value;
    setSearchName(searchValue);

    if (searchValue.trim()) {
      const filtered = persons.filter((person) =>
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const addPerson = () => {
    if (newName.trim() === "" || newNumber.trim() === "") {
      handleError(
        "Name and phone number fields cannot be empty",
        new Error("Empty input")
      );
      return;
    }

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.trim().toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newPerson.name} is already added to the phonebook. Do you want to update their phone number?`
        )
      ) {
        personService
          .update(existingPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id !== existingPerson.id
                  ? person
                  : { ...person, number: updatedPerson.number }
              )
            );
            resetForm();
            setSuccessMessage(
              `Successfully updated ${newPerson.name}'s phone number`
            );
            setTimeout(() => setSuccessMessage(null), 8000);
          })
          .catch((error) => {
            handleError(
              error.response && error.response.status === 404
                ? `${newPerson.name} was most likely removed from the server already`
                : `There was an error updating ${newPerson.name}.`,
              error
            );
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons((prevPersons) => [...prevPersons, createdPerson]);
          resetForm();
          setSuccessMessage(`Successfully added ${newPerson.name}`);
          setTimeout(() => setSuccessMessage(null), 8000);
        })
        .catch((error) =>
          handleError(`There was an error adding ${newPerson.name}.`, error)
        );
    }
  };

  const resetForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);

    if (person) {
      if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
        personService
          .remove(id)
          .then(() => {
            setPersons(persons.filter((person) => person.id !== id));
            setSuccessMessage(`Successfully deleted ${person.name}`);
            setTimeout(() => setSuccessMessage(null), 8000);
          })
          .catch((error) =>
            handleError(`There was an error deleting ${person.name}.`, error)
          );
      } else {
        handleError(
          `Didn't remove ${person.name}.`,
          new Error("User cancellation")
        );
      }
    } else {
      handleError(
        `The user ${person.name} was not found.`,
        new Error("User not found")
      );
    }
  };

  return (
    <main>
      {errorMessage && (
        <Notification notificationType="error" message={errorMessage} />
      )}
      {successMessage && (
        <Notification notificationType="success" message={successMessage} />
      )}

      <section>
        <h1>Phonebook</h1>
        <h2>Search contact name</h2>
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
