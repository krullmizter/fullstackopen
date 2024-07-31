import { useState, useEffect } from "react";
import { Notification, Filter, PersonForm, Person } from "./components";
import { personService } from "./services";
import DOMPurify from 'dompurify';

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

  const addPerson = (event) => {
    event.preventDefault();
    const { newName, newNumber } = formState;

    if (newName.length < 3) {
      handleNotification("error", "Name must be at least 3 characters long");
      return;
    }

    const numberReg = /^\d{2,3}-\d+$/;
    if (!numberReg.test(newNumber) || newNumber.length < 8) {
      handleNotification(
        "error",
        "Phone number must be in the format: XX-XXXXXXX or XXX-XXXXXXX and at least 8 characters long"
      );
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(existingPerson.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            handleNotification("success", `Updated ${returnedPerson.name}`);
          })
          .catch(() => {
            handleNotification(
              "error",
              `Error updating ${existingPerson.name}`
            );
          });
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          handleNotification("success", `Added ${returnedPerson.name}`);
        })
        .catch(() => {
          handleNotification(
            "error",
            `Error adding ${personObject.name}`
          );
        });
    }

    setFormState({ newName: "", newNumber: "" });
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (!person) {
      console.error("Person not found");
      return;
    }

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons((prev) => prev.filter((p) => p.id !== id));
          handleNotification("success", `${person.name} was deleted`);
        })
        .catch(() =>
          handleNotification(
            "error",
            `Error deleting ${person.name}`
          )
        );
    }
  };

  const handleNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: "", message: "" });
    }, 5000);
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