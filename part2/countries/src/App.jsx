import { useState, useEffect } from 'react'
import axios from 'axios'
const App = () => {
  // Nota: no poner los set... en el cuerpo del componente causa renderizados infinitos
  const [value, setValue] = useState('')
  const [paises, setPaises] = useState([]) // Lista de paises con su informacion
  const [countryToShow, setCountryToshow] =useState(null)
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
        const currentPais = pais.name.common.toLowerCase()
        const pattern = new RegExp(value.toLowerCase())
        return pattern.test(currentPais)
      })
    }
  }

  const currentListCountry = getPaisesToShow(); // en todos los renderizados se establece esta constante con una lista de paises

  
  useEffect(() => {
    if (currentListCountry.length === 1) {
      setCountryToshow(currentListCountry[0]); // 
    }
  }, [currentListCountry]); // Dependencia: el efecto se ejecuta solo cuando cambia la variable currenListCountry
  
  const handleChange = (event) => {
    const current = event.target.value
    setCountryToshow(null)
    setValue(current)
  }

  const handleClick = (pais) =>{
    setCountryToshow(pais)
  }
  return (
    <>
      find countries <input value={value} onChange={handleChange} />
      <div>
       
        {getPaisesToShow().length > 10 && ( // Si la lista tiene una longitud de mas de 10, muestra este mensaje
          <div>Too many matches, specify another filter</div>
        )}

        {countryToShow ===null && getPaisesToShow().length>1 &&
        getPaisesToShow().length <= 10 && // Si la lista tiene una longitud de mas de 1 y menor o igual a 10, muestra la lista

        getPaisesToShow().map(pais => (
          <div key={pais.name.common}>
            {pais.name.common} <button onClick={()=>handleClick(pais)}>show</button>
          </div>
        ))}

        {countryToShow !== null &&
        <>
          <h1>{countryToShow.name.common}</h1>
          <p>capital {countryToShow.capital[0]}</p>
          <p>area {countryToShow.area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.keys(countryToShow.languages).map(key =>(
              <li key = {key}>{countryToShow.languages[key]}</li>
            ))}
          </ul>
          <img src={countryToShow.flags.svg} alt={countryToShow.flags.alt} />

        </>
        }
      </div>
    </>
  )
}

export default App
