const Person = ({person, handleEliminate}) =>{
    return(
        <div>
            <span>{person.name} {person.number} <button onClick={()=>handleEliminate(person.id)}>delete</button></span>
        </div>
        
       
    )
}
export default Person