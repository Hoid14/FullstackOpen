const Header = ({courseName}) =>{
  return (
    <h1>{courseName}</h1>
  )
}

const Content = ({part,exerciseNumber} )=>{
  return(
    <p>
      {part} {exerciseNumber}
    </p>
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
      <Content part={part1} exerciseNumber={exercises1}/>
      <Content part={part2} exerciseNumber={exercises2} />
      <Content part={part3} exerciseNumber={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App