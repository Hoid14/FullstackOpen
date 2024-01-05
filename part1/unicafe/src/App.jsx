import { useState } from 'react'
const Button = ({handleclick, text}) => {
  return(
    <button onClick={handleclick}>
      {text}
    </button>
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
    <div>
      <h1>give feedback</h1>
      <Button handleclick={()=>handleClick(good, setGood)} text='good'/>
      <Button handleclick={()=>handleClick(neutral, setNeutral)} text='neutral'/>
      <Button handleclick={()=>handleClick(bad, setBad)} text='bad'/>
      <h1>statistics</h1>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {totalComentarios()}</p>
      <p>average {puntuacionPromedio()}</p>
      <p>positive {porcentajeComPositivos()} %</p>




    </div>
  )
}

export default App