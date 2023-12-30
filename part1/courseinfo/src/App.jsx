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
const Content = ({part1,exerciseNumber1,part2,exerciseNumber2,part3,exerciseNumber3} )=>{
  return(
    <div>
      <Part part={part1} exerciseNumber={exerciseNumber1}/>
      <Part part={part2} exerciseNumber={exerciseNumber2}/>
      <Part part={part3} exerciseNumber={exerciseNumber3}/>
    </div>
  )
}

const Total = ({total})=>{
  return(
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  

  return (
    <div>
      <Header courseName={course}/>
      <Content part1={part1.name} exerciseNumber1={part1.exercises} part2={part2.name} exerciseNumber2={part2.exercises} part3={part3.name} exerciseNumber3={part3.exercises}/>
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App