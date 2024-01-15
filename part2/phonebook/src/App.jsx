import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  const getListaNombres = persons.map(person => (
    person.name
  ))

  const personsToShow = persons.filter(person =>{
    let currentPerson= person.name.toLowerCase()
    let pattern = new RegExp(newFilter.toLowerCase())
    return(
      pattern.test(currentPerson)
    )
  })
  
  const handleSubmit = (event)=>{
    event.preventDefault()
    if (getListaNombres.includes(newName)){
      alert(
        `${newName} is already added to phonebook`
      )
      setNewName('')
      setNewNumber('')
    }
    else{
      const newObject = {
        name: newName,
        number: newNumber
      }
      const listaPersonas = persons.concat(newObject)
      setPersons(listaPersonas)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleChangeName = (event)=>{
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event)=>{
    setNewNumber(event.target.value)
  }
  
  const handleChangeFilter = (event) =>{
    setNewFilter(event.target.value)
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter valor={newFilter} alCambiar={handleChangeFilter}/>

      <h2>add a new</h2>

      <PersonForm 
      handleSubmit={handleSubmit} 
      newName={newName}
      handleChangeName={handleChangeName}
      newNumber={newNumber}
      handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App
