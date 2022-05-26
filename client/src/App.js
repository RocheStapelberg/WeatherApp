import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('pretoria');
  const [state, setState] = useState('pretoria');
  const apiUrl = `/api/weather/${state}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data)
      });
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };
  // Functions convert kelvin to celsius
  const kelvinToCelsius = (k) => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <div className="App">
      <header className="justify-content-center align-items-center App-header" style={{backgroundColor:"#312f3c"}}>
        <h2 style={{color:"#23cf7e"}} >//Weather Application</h2>
        <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center" style={{color:"#23cf7e"}}>
          <div class="col-auto">
            <label for="location-name" class="col-form-label">
              Enter Location :
            </label>
          </div>
          <div class="col-auto">
            <input
              type="text"
              id="location-name"
              class="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={submitHandler}>
            Search
          </button>
        </div>

        <div className="card mt-3 mx-auto" style={{ width: '60vw', backgroundColor:"#25242e" }}>
          {apiData.main ? (
            <div class="card-body text-center">
              <img
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
                style={{height:"80px"}}
              />
              <p className='h3'>City: <strong style={{color:"#23cf7e"}}>{apiData.name}</strong></p>
              <h3>{apiData.weather[0].main}</h3>
              <p className="h4 mt-3">Temprature now: <strong style={{color:"#23cf7e"}}>{kelvinToCelsius(apiData.main.temp)}&deg; C</strong></p>{' '}
              <p className='h4'>Temprature Low: <strong style={{color:"#23cf7e"}}>{kelvinToCelsius(apiData.main.temp_min)}&deg; C</strong></p>{' '}
              <p className='h4'>Temprature High: <strong style={{color:"#23cf7e"}}>{kelvinToCelsius(apiData.main.temp_max)}&deg; C </strong></p>{' '}
              <p className='h4'>Wind speed: <strong style={{color:"#23cf7e"}}>{apiData.wind.speed}</strong></p>{' '}
                </div>
          ) : (
            <h1 style={{color:"red"}}>404 : Not Found</h1>
          )}
        </div>
      </div>
      </header>
    </div>
  );
}

export default App;

