import { useContext, useEffect, useState } from "react";
import { myWeather } from "./HomePage";
import CurrentGeoLocation from "./CurrentGeoLocation";
import axios from "axios";

export default function WeatherDetails(){
  const [Weather, setWeather] = useContext(myWeather);
  const { position } = CurrentGeoLocation();
  const [data, setData] = useState([]);
  const [country, setCountry] = useState({});

  let CurrentDate = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[CurrentDate.getDay()];
  let date = CurrentDate.getDate();
  let month = CurrentDate.toString().split(" ")[1];
  let year = CurrentDate.getFullYear();
  let lat;
  let lon;
  let time = new Date().toLocaleTimeString();
  // Digital clock
  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);

  // get weather forecast data for 7days
  const getWeather = async () => {
    if (Weather) {
      lat = Weather.lat;
      lon = Weather.lon;
    } else {
      lat = position.latitude;
      lon = position.longitude;
    }
    
    if (lat && lon) {
      console.log('lat',lat, 'lon',lon)
      try {
        let res2 = await axios.get(
          `https://api.weatherbit.io/v2.0/forecast/daily?days=8&lat=${lat}&lon=${lon}&key=bfe4846bdc59485c9708673ce7c360ea`
        );
        console.log(res2)
        setCountry(res2.data);
        setData(res2.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // handel weather forecast function
  useEffect(() => {
    getWeather();
  }, [position, Weather]);

   return(
   <div>
        {data.length?<div className="bg-neutral-400 ">
      <div className="current-weather">
        <div className="city-location-data">
          <p>
            {country.city_name?country.city_name:'Location'}
            <span className="material-symbols-outlined">location_on</span>
          </p>
          {data.length ? 
            <div className="temp-datas">
              <p>{data[0].temp} °c temp</p>
              <p>{data[0].dewpt} °c dew</p>
              <p>
                {data[0].wind_spd} wind
                <span className="material-symbols-outlined">air</span>
              </p>
              <div>
                <img
                  src={`https://cdn.weatherbit.io/static/img/icons/${data[0].weather.icon}.png`}
                  alt=""
                />
                <p>{data[0].weather.description}</p>
              </div>
            </div>
          : ''}
        </div>
        <div className="country-location-time">
          {/* <div className="geo-ctry">
            <p>{country.country_code}</p>
            <img
              src={`https://flagsapi.com/${country.country_code}/flat/64.png`}
              alt=""
            />
          </div> */}
          {/* <div className="dates-now">
            <div className="DD">
              <p>{day}</p>
              <div>
                {date} {month} {year}
              </div>
              <span>{country.timezone}</span>
            </div>
            <div className="time">
              <p>{time.split(':')[0]}:{time.split(':')[1]}</p>
              <p>{time.split(':')[2].split(' ')[1]}</p>
            </div>
          </div> */}
        </div>
      </div>
      {/* <div className="daily-forecast">
      <div className="weather">
        {data&&data.slice(1).map((a, i) => (
          <div className="card1" key={i}>
            <div className="dates">
              <p>
                {
                  new Date(
                    a.datetime.split("-")[0],
                    a.datetime.split("-")[1] - 1,
                    a.datetime.split("-")[2]
                  )
                    .toString()
                    .split(" ")[0]
                }
              </p>
            </div>

            <div className="deg">
              <p>{a.temp} °c temp</p>
              <p>{a.dewpt} °c dew</p>
            </div>
            <div className="foreimg">
              <img
                src={`https://cdn.weatherbit.io/static/img/icons/${a.weather.icon}.png`}
                alt=""
              />
              <p>{a.weather.description}</p>
            </div>
          </div>
        ))}
      </div>
      </div> */}
      </div>:<div className="progress">
        {/* <img src={progress} alt="" /> */}
        <div>Loading...</div>
        </div>}
      </div>
      )
  
}
