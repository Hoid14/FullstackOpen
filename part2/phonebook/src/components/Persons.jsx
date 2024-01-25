import Person from "./Person"

const Persons = ({personsToShow, handleEliminate}) =>{
    return(
        <>
        {personsToShow.map((person)=>(
           <Person key={person.name} person ={person} handleEliminate={handleEliminate}/>
        ))}
        </>
    )
}
export default Persons