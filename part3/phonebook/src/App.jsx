import { useState, useEffect } from "react";
import { Notification, Filter, PersonForm, Person } from "./components";
import { personService } from "./services";
import DOMPurify from "dompurify";
import config from "./config";

const { constants, errorMessages } = config;

const validateName = (name) => name.length >= constants.NAME_MIN_LENGTH;
const validateNumber = (number) =>
  constants.NUMBER_REGEX.test(number) &&
  number.length >= constants.NUMBER_MIN_LENGTH;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [formState, setFormState] = useState({ newName: "", newNumber: "" });
  const [searchName, setSearchName] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: DOMPurify.sanitize(value),
    }));
  };

  const handleNameSearch = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setSearchName(sanitizedValue);
    const suggestions = persons.filter((person) =>
      person.name.toLowerCase().includes(sanitizedValue.toLowerCase())
    );
    setFilteredSuggestions(suggestions);
  };

  const handleNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: "", message: "" });
    }, constants.NOTIFICATION_TIMEOUT);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const { newName, newNumber } = formState;

    if (!validateName(newName)) {
      handleNotification("error", errorMessages.nameLength);
      return;
    }

    if (!validateNumber(newNumber)) {
      handleNotification("error", errorMessages.numberLength);
      return;
    }

    const personObject = { name: newName, number: newNumber };
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} ${errorMessages.invalidPhone}`)) {
        updatePerson(existingPerson.id, personObject);
      }
    } else {
      createPerson(personObject);
    }

    setFormState({ newName: "", newNumber: "" });
  };

  const updatePerson = (id, personObject) => {
    personService
      .update(id, personObject)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        );
        handleNotification("success", `Updated ${returnedPerson.name}`);
      })
      .catch(() => {
        handleNotification("error", `Error updating ${personObject.name}`);
      });
  };

  const createPerson = (personObject) => {
    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        handleNotification("success", `Added ${returnedPerson.name}`);
      })
      .catch(() => {
        handleNotification("error", `Error adding ${personObject.name}`);
      });
  };

  const deletePerson = async (id) => {
    const person = persons.find((p) => p.id === id);
    if (!person) {
      console.error(errorMessages.personNotFound);
      handleNotification("error", errorMessages.personNotFound);
      return;
    }

    const confirmDeletion = window.confirm(`Delete ${person.name}?`);
    if (!confirmDeletion) return;

    try {
      await personService.remove(id);
      setPersons((prev) => prev.filter((p) => p.id !== id));
      handleNotification("success", `${person.name} was deleted`);
    } catch (error) {
      console.error(`Error deleting ${person.name}:`, error);
      handleNotification("error", `Error deleting ${person.name}`);
    }
  };

  return (
    <main className="app">
      {notification.message && (
        <Notification type={notification.type} message={notification.message} />
      )}

      <section className="app__section">
        <h1 className="app__title">Phonebook</h1>
        <Filter
          inputPlaceholder="Search by name..."
          filterValue={searchName}
          filterChange={handleNameSearch}
          filterSuggestions={filteredSuggestions}
        />
      </section>

      <section className="app__section">
        <h2 className="app__subtitle">Add a new contact</h2>
        <PersonForm
          onSubmit={addPerson}
          nameValue={formState.newName}
          nameOnChange={handleFormChange}
          numberValue={formState.newNumber}
          numberOnChange={handleFormChange}
        />
      </section>

      <section className="app__section">
        <h2 className="app__subtitle">Contacts</h2>
        <Person array={persons} onDelete={deletePerson} />
      </section>
    </main>
  );
};

export default App;
