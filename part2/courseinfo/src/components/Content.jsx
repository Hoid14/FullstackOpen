import Part from './Part'
const Content = ({parts}) =>{
    console.log(parts);
    const sumExercises = () =>{
        let sum = 0
        for (const part of parts){
            sum += part.exercises
        }
        return sum
    }
    return(
        <>
        {parts.map(part=>(
            <Part key={part.id} part={part}/>
        ))}
        <h3>total of {sumExercises()} exercises</h3>
        </>
    )
}

export default Content