import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import service from './services/phonebooks'
const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    service
    .getAll()
    .then(response =>{
      setPersons(response)
      })
  }, [])//Hace que se ejecute solo una vez
  
  
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  

  

  const personsToShow = persons.filter(person =>{
    let currentPerson= person.name.toLowerCase()
    let pattern = new RegExp(newFilter.toLowerCase())
    return(
      pattern.test(currentPerson)
    )
  })
  
  const handleSubmit = (event)=>{
    event.preventDefault()
    console.log("Nombre",newName)
    console.log("Numero",newNumber)
    const getPerson = persons
    .filter(person=>{
      return person.name === newName 
    })
    console.log("Lista devuelta por el filtro",getPerson)
    console.log("tamaño de la lista", getPerson.length)
    console.log("verdad o falso",getPerson.length>0)
    if (getPerson.length>0 && getPerson[0].name === newName){
      window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
        console.log("objeto sin modificar",getPerson[0])
        const copyObjetct = {...getPerson[0], number:newNumber}
        console.log("objeto copia modificado",copyObjetct)
        console.log("id",getPerson[0].id)
        service
        .update(getPerson[0].id, copyObjetct)
        .then(response =>{
          console.log("respuesta del servidor",response)
          setPersons(persons.map(person =>(
            person.id !== getPerson[0].id ? person:response
          )))
        })
        setNewName('')
        setNewNumber('')
      
    }
    else{
      const newObject = {
        name: newName,
        number: newNumber
      }
      service
      .create(newObject) //Crear nuevo objeto
      .then(response =>{ //Devuelve el objeto solo (response.data)
        const listaActualizada = persons.concat(response)
        setPersons(listaActualizada)
        console.log(listaActualizada)
      })
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

  const handleEliminate = (id) =>{
    service
    .eliminate(id)
    .then(() =>{
      const newList = persons.filter(person => person.id !== id)
      setPersons(newList)
      console.log("Nueva lista",newList)
    })
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
      <Persons personsToShow={personsToShow} handleEliminate={handleEliminate}/>
    </div>
  )
}

export default App
