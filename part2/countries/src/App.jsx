import { useState, useEffect } from 'react'
import axios from 'axios'
const App = () => {
  // Nota: no poner los set... en el cuerpo del componente causa renderizados infinitos
  const [value, setValue] = useState('')
  const [paises, setPaises] = useState([]) // Lista de paises con su informacion
  const [countryToShow, setCountryToshow] =useState(null)
  const [capitalWather, setCapitalWeather]=useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY

// variable api_key now has the value set in startup
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
  
  
  
  useEffect( () =>{ //Obtener el clima de la capital
    if(countryToShow !== null){
      axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${countryToShow.capitalInfo.latlng[0]}&lon=${countryToShow.capitalInfo.latlng[1]}&appid=${api_key}`
      )
      .then(response =>{
        setCapitalWeather(response.data)
      })
    }
    
  }, [countryToShow,api_key])


  
  
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
        {capitalWather!==null && countryToShow!==null &&
          <>
          <h1>Weather in {countryToShow.capital[0]}</h1>
          <p>temperature {capitalWather.main.temp-273.15} Celcius</p>
          <img src="https://openweathermap.org/img/wn/02n@2x.png" alt="weather_icon" />
          <p>wind {capitalWather.wind.speed} m/s</p>
          </>
        }
      </div>
    </>
  )
}

export default App
