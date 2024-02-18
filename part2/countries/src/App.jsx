import { useState, useEffect } from 'react'
import axios from 'axios'
const App = () => {
  const [value, setValue] = useState('')
  const [paises, setPaises] = useState([]) // Lista de paises con su informacion
  useEffect( ()=>{
    axios
    .get(
      `https://studies.cs.helsinki.fi/restcountries/api/all`
    )
    .then(response => {
      let paises = response.data
      paises.sort((a,b)=>{
        if(a.name.common < b.name.common){
          return -1
        }
        if(a.name.common > b.name.common){
          return 1
        }
        return 0
      })
      setPaises(paises)
    })
  }, [])


  const getPaisesToShow = () =>{
    if (value === ''){
      return []
    }
    else{
      return paises.filter(pais =>{
        const currentPais = pais.name.common.toLocaleLowerCase()
        const pattern = new RegExp(value.toLocaleLowerCase())
        return pattern.test(currentPais)
      })
    }
  }
  console.log(getPaisesToShow()[0])

  const uniqueCountry = getPaisesToShow().length === 1
  ? getPaisesToShow()[0]
  : {}

  const lenguajes = getPaisesToShow().length === 1
  ? getPaisesToShow()[0].languages
  : {}
  
  const handleChange = (event) => {
    const current = event.target.value
    setValue(current)
  }
  return (
    <>
      find countries <input value={value} onChange={handleChange} />
      <div>
       
        {getPaisesToShow().length > 10 && ( // Si la lista tiene una longitud de mas de 10, muestra este mensaje
          <div>Too many matches, specify another filter</div>
        )}

        {getPaisesToShow().length>1 &&
        getPaisesToShow().length <= 10 && // Si la lista tiene una longitud de mas de 1 y menor o igual a 10, muestra la lista

        getPaisesToShow().map(pais => (
          <div key={pais.name.common}>
            {pais.name.common}
          </div>
        ))}

        {getPaisesToShow().length ===1 &&
        <>
          <h1>{getPaisesToShow()[0].name.common}</h1>
          <p>capital {getPaisesToShow()[0].capital[0]}</p>
          <p>area {getPaisesToShow()[0].area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.keys(lenguajes).map(key =>(
              <li key = {key}>{lenguajes[key]}</li>
            ))}
          </ul>
          <img src={uniqueCountry.flags.svg} alt={uniqueCountry.flags.alt} />

        </>
        }
      </div>
    </>
  )
}

export default App
