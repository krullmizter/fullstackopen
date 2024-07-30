import { useState, useEffect } from "react";
import "./assets/App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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
    };

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.trim().toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newPerson.name} is already added to the phonebook.\nDo you want to update their phone number?`
        )
      ) {
        personService
          .update(existingPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id
                  ? person
                  : { ...person, number: updatedPerson.number }
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.error("There was an error updating the person:", error);
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("There was an error adding the person:", error);
        });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);

    if (person) {
      if (window.confirm(`Are you sure you want to delete: ${person.name}?`)) {
        personService
          .remove(id)
          .then(() => {
            setPersons(persons.filter((person) => person.id !== id));
          })
          .catch((error) => {
            console.error("There was an error deleting the person:", error);
          });
      } else {
        alert(`Didn't remove ${person.name}.`);
      }
    } else {
      console.error("Person not found");
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

      <Person array={persons} onDelete={deletePerson} />
    </div>
  );
};

export default App;
