import Part from './Part'
const Content = ({parts}) =>{
    
    const sumExercises = parts.reduce(
        (accumulator,current)=>
        accumulator + current.exercises,
            0, 
        )
    return(
        <>
        {parts.map(part=>(
            <Part key={part.id} part={part}/>
        ))}
        <h3>total of {sumExercises} exercises</h3>
        </>
    )
}

export default Content