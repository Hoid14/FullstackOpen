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

  const handleclick = (value, funcionModificadora) =>{
    funcionModificadora(value+1)
  }
  return(
    <div>
      <h1>give feedback</h1>
      <Button handleclick={()=>handleclick(good, setGood)} text='good'/>
      <Button handleclick={()=>handleclick(neutral, setNeutral)} text='neutral'/>
      <Button handleclick={()=>handleclick(bad, setBad)} text='bad'/>
      <h1>statistics</h1>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>


    </div>
  )
}

export default App