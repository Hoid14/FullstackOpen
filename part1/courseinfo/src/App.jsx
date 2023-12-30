const Header = ({courseName}) =>{
  return (
    <h1>{courseName}</h1>
  )
}
const Part = ({part,exerciseNumber})=>{
  return(
    <p>
      {part} {exerciseNumber}
    </p>
  )
}
const Content = ({parts} )=>{
  return(
    <div>
      <Part part={parts[0].name} exerciseNumber={parts[0].exercises}/>
      <Part part={parts[1].name} exerciseNumber={parts[1].exercises}/>
      <Part part={parts[2].name} exerciseNumber={parts[2].exercises}/>
    </div>
  )
}

const Total = ({parts})=>{
  return(
    <p>Number of exercises {parts[0].exercises+parts[1].exercises+parts[2].exercises}</p>
  )
}

const App = () => {
  
  const course = {
    name:'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}
console.log(course)

  

  

  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App