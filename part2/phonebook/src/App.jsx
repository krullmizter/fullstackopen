import { useState } from 'react'
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState([])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleNameSearch = (e) => {
    const searchValue = e.target.value
    setSearchName(searchValue)

    if (searchValue.trim() !== '') {
      const filtered = persons.filter(person => 
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredSuggestions(filtered)
    } else {
      setFilteredSuggestions([])
    }
  }

  const addPerson = (e) => {
    e.preventDefault()

    const newPerson = { name: newName.trim(), number: newNumber.trim() }

    if (persons.some(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
      alert(`${newPerson.name} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <h2>Search names:</h2> 
        <input placeholder="contact name" value={searchName} onChange={handleNameSearch} />
        {filteredSuggestions.length > 0 && (
          <div>
            {filteredSuggestions.map(person => (
              <div key={person.id}>
                {person.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2>Add a new contact</h2>
        <form onSubmit={addPerson}>
          <p>
            <label>
              <span>Name: </span>
              <input value={newName} onChange={handleNameChange} />
            </label>
          </p>

          <p>
            <label>
              <span>Phone number: </span>
              <input value={newNumber} onChange={handleNumberChange} /><br />
            </label>
          </p>

          <button type="submit">Add contact</button>
        </form>

        <h2>Contacts</h2>
        <div>
          {persons.map((person, index) => (
            <p key={index}>{person.name} <span>{person.number}</span></p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App