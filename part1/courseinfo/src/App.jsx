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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseName={course}/>
      <Content part1={part1} exerciseNumber1={exercises1} part2={part2} exerciseNumber2={exercises2} part3={part3} exerciseNumber3={exercises3}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App