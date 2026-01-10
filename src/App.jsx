import Filter from './components/Filter'
import Form from './components/Form'
import Person from './components/Person'
import personService from './services/people' // contains functions responsible for communicating with the backend server
import { useState, useEffect } from 'react'


const App = () => {

 
  // state responsible for rendering exisiting names & phone numbers onto the screen 
  const [persons, setPersons] = useState([])

  // state responsible for handling user input like name, number and filtering 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredInput, setFilteredInput] = useState('')

  // fetches data from the json server and updates the SetPersons 
  useEffect(()=> {
    personService
      .getAll()
      .then(initialPeople=> {
        setPersons(initialPeople)
      })
  }, []) 

  console.log('render', persons.length, 'persons')

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
      }

      personService
        .create(newPerson) // make a post request to the json server with the newly created Json object 
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson)) // update the person state with the new person info 
          setNewName('')                            // clear the new name and number input fields
          setNewNumber('')
        })
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

  /* deleteIndividualUser function takes the person id as a paramter. it is going to delete the user on the json server 
  with the url http://localhost/persons/id and then update the persons state to a copy of the array without the 
  deleted user.
  */
  const deleteIndividualUser = (id) => {
    console.log(`deleting user with id of ${id}...`) 

    personService
     .deleteUser(id)
     .then(returnedUser => {
       console.log(returnedUser)
       setPersons(persons.filter(person => person.id !== returnedUser.id))
     })
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
          deleteUser={()=> deleteIndividualUser(person.id)}
         /> 
      ))}
    </div>
  )
}

export default App