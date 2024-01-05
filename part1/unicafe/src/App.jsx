import { useState } from 'react'
const Button = ({handleclick, text}) => {
  return(
    <button onClick={handleclick}>
      {text}
    </button>
  )
}
const StatisticLine = (props) => {
  const {value, text} = props
  console.log(props)
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    
  )
}
const Statistics = (props) => {
  const {good,neutral,bad} = props
  const totalComentarios = () => good+neutral+bad
  const puntuacionPromedio = () =>{
    return(
      (good*1+neutral*0+bad*-1)/(good+neutral+bad)
    )
  }
  const porcentajeComPositivos = () =>{
    return(
      (good/totalComentarios())*100
    )
  }
  return(
    <>
    <h1>statistics</h1>
    {totalComentarios() > 0 &&
      <>
      <table>
        <tbody>
          <StatisticLine text ='good' value={good}/>
          <StatisticLine text ='neutral' value={neutral}/>
          <StatisticLine text ='bad' value={bad}/>
          <StatisticLine text ='all' value={totalComentarios()}/>
          <StatisticLine text='average' value={puntuacionPromedio()}/>
          <StatisticLine text='positive' value={porcentajeComPositivos()}/>
      </tbody>
      </table>
      
      </>
    }

    {
      totalComentarios() === 0 && 
      <p>No feedback given</p>
    }
    
  </>
  )
  
}
const App = () => {
  // guarda los clics de cada boton en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (value, funcionModificadora) =>{
    funcionModificadora(value+1)
  }

  
  return(
    <div>
      <h1>give feedback</h1>
      <Button handleclick={()=>handleClick(good, setGood)} text='good'/>
      <Button handleclick={()=>handleClick(neutral, setNeutral)} text='neutral'/>
      <Button handleclick={()=>handleClick(bad, setBad)} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App