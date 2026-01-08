import Filter from './components/Filter'
import Form from './components/Form'
import Person from './components/Person'
import { useState } from 'react'


const App = () => {

 
  // state responsible for rendering exisiting names & phone numbers onto the screen 
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  // state responsible for handling user input like name, number and filtering 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredInput, setFilteredInput] = useState('')


  // event handler to add new users to the phonebook
  // check if the person already exists in the phonebook, if not create a new person object with the newName
  // value, concat that person to the persons array and clear the input for the newName value
  const addPerson = (event) => {
    event.preventDefault()
    let alreadyExist = false

    // check if a user with the given name already exists in the phonebook
    persons.forEach((person) => {
      if (person.name == newName) {
        alreadyExist = true
      }
    })

    if (alreadyExist == true) {
      // if so dont add them to the phonebook
      alert(`${newName} is already added to phonebook`)      
      return

    } else {
      // else create a new person object, update the person state with the new person added to the phonebook
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPerson))
      setNewName('') // clear the input field for new name
      console.log(`${newName} is added to phonebook`)
    }  
  }

  // event handlers to handle changes in the input fileds of name, number, and filter
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFiltering = (event) => {
    setFilteredInput(event.target.value)
  }

  // if filteredInput has text then show the filtered list
  // otherwise show all persons
  const personsToShow = filteredInput
  ? persons.filter((person) =>
      person.name.toLowerCase().includes(filteredInput.toLowerCase())
    )
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter component </p>
      <Filter filteredInput={filteredInput} onChange={handleFiltering}/>
      <h2>Add a new person</h2>
      <Form
        onSubmit={addPerson}                      // event handler
        newName={newName}                         // state 
        handleNameChange={handleNameChange}       // event handler
        newNumber={newNumber}                     // state 
        handleNumberChange={handleNumberChange}   // event handler
        
      />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Person 
          key={person.id}
          name={person.name}
          number={person.number}
         /> 
      ))}
    </div>
  )
}

export default App