import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const getListaNombres = persons.map(person => (
    person.name
  ))


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
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input
          value ={newName}
          onChange={handleChangeName}
          />
        </div>
        <div>
          number: <input 
          value = {newNumber}
          onChange={handleChangeNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=>(
        <div key = {person.name}>{person.name} {person.number}</div>
      ))}
    </div>
  )
}

export default App
