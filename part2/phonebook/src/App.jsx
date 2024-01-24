import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() =>{
    axios
    .get("http://localhost:3001/persons")
    .then(
      response => {
        setPersons(response.data)
      }
    )
  },[]) //Hace que se ejecute solo una vez
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  // Guardar numeros en el backend
  const create = (newObject) => {
    axios.post("http://localhost:3001/persons",newObject)
    .then(response =>{
      setPersons(persons.concat(response.data)) //Se crea una nueva lista que une el array "persons" con el nuevo objeto devuelto por el backend
    })
  }

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
      create(newObject)
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
