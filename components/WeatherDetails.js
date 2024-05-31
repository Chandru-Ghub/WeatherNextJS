import { useContext, useEffect, useState } from "react";
import { myWeather } from "./HomePage";
import { Calendar, MapPin, Sun, Moon, Wind, Waves, Droplets, Thermometer, Eye   } from "lucide-react";
import CurrentGeoLocation from "./CurrentGeoLocation";
import axios from "axios";
import Image from "next/image";

export default function WeatherDetails() {
  const [Weather, setWeather] = useContext(myWeather);
  const { position } = CurrentGeoLocation();
  const [data, setData] = useState([]);
  const [hourly, setHourly] = useState([]);
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
  // const [ctime, setTime] = useState(time);
  // const UpdateTime = () => {
  //   time = new Date().toLocaleTimeString();
  //   setTime(time);
  // };
  // setInterval(UpdateTime);

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
      try {
        let res2 = await axios.get(
          `https://api.weatherbit.io/v2.0/forecast/daily?days=8&lat=${lat}&lon=${lon}&key=${process.env.NEXT_PUBLIC_APIKEY}`
        );

        let res1 = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_APIKEY2}&units=metric`)
        const hourlyForeCast = []
        const fiveDayForecast = res1.data.list.filter((item) => {
              const filteredData = new Date(item.dt_txt).getDate()
              if(date == filteredData || date+1 == filteredData){
                return hourlyForeCast.push(filteredData)
              }
        })
        setHourly(fiveDayForecast)
        console.log(res2.data)
        console.log(fiveDayForecast)
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

  return (
    <div>
      {data.length ? (
        <div className="bg-black pt-5 flex flex-wrap gap-4 justify-center">
          <div className="bg-black p-5 w-fit">
            <div className=" text-white bg-stone-950 w-[330px] px-5 py-3 rounded-3xl ">
              {data.length ? (
                <div className="temp-datas">
                  <span>Now</span>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex gap-3">
                      <p className="text-5xl">{data[0].temp}</p>
                      <span className="text-3xl">°c</span>
                    </div>
                    <div className="">
                      <Image
                        className="w-20"
                        src={`http://openweathermap.org/img/wn/${hourly[0].weather[0].icon}@2x.png`}
                        alt="/"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                  <p className="px-1 pb-3 border-b-2 border-neutral-800 mt-2 font-medium capitalize">
                    {data[0].weather.description}
                  </p>
                  <div className="mt-2">
                    <div className="flex gap-2 p-2">
                      <p>
                        <Calendar className="mr-1" />
                      </p>
                      <p className="text-neutral-400">{day}</p>
                      <p className="text-neutral-400">{date},</p>
                      <p className="text-neutral-400">{month}</p>
                    </div>
                    <div className="flex gap-2 p-2 flex items-center">
                      <p>
                        <MapPin className="mr-1" />
                      </p>
                      <p className="text-neutral-400">
                        {country.city_name ? country.city_name : "Location"},
                      </p>
                      <p className="text-neutral-400">{country.country_code}</p>
                      <Image
                      className="w-7 h-7"
                      src={`https://flagsapi.com/${country.country_code}/flat/64.png`}
                      alt=""
                      width={80}
                      height={80}
                    />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <p className="w-fit my-2 text-white capitalize">7 Days forecast</p>
            </div>

            <div className="bg-stone-950 px-3 py-2 mt-4 rounded-3xl w-[330px] h-[350px] overflow-scroll no-scrollbar">
              {
                data.slice(1).map((list,i)=>
                  <div key={i} className="px-3 py-1 flex mt-2 justify-between">
                    <div className="flex items-center justify-center gap-2">
                      <Image className="w-12" src={`https://cdn.weatherbit.io/static/img/icons/${list.weather.icon}.png`} width={80}
                      height={80} alt="" />
                      <p className="text-white">{list.temp} °c </p>
                    </div>
                  <div className="flex gap-2 justify-center items-center mx-2">
                  <p className="text-neutral-400">{new Date(
                    list.datetime.split("-")[0],
                    list.datetime.split("-")[1] - 1,
                    list.datetime.split("-")[2]
                  )
                    .toString()
                    .split(" ")[2]}</p>
                    <p className="text-neutral-400">{new Date(
                    list.datetime.split("-")[0],
                    list.datetime.split("-")[1] - 1,
                    list.datetime.split("-")[2]
                  )
                    .toString()
                    .split(" ")[1]}</p>
                  </div>
                  <p className=" text-neutral-400 flex items-center justify-center">{new Date(
                    list.datetime.split("-")[0],
                    list.datetime.split("-")[1] - 1,
                    list.datetime.split("-")[2]
                  )
                    .toString()
                    .split(" ")[0]}</p>
                  </div>
                )
              }
            </div>
            <div className="country-location-time">           
            </div>
          </div>
    
            <div className="text-white bg-black rounded-3xl p-5 w-[70%]">
              <div className="bg-stone-950 p-5 rounded-3xl ">
                  <h2 className="font-medium">Today Highlights</h2>
                  <div className="flex gap-2 mt-5 flex-wrap ">
                    <div className=" p-2   w-[45%]  min-w-[420px]">
                      <div className="flex justify-center items-center justify-between px-3 py-2 ">
                        <div className="text-neutral-400">Air Quality Index</div>
                        <div className="bg-green-600 rounded-2xl px-3 py-1">Good</div>
                      </div>
                      <div className="flex gap-5 p-4 justify-between  items-center mt-3 rounded-2xl">
                        <div>
                          <Wind size={40}/>
                        </div>
                        <div className=" flex flex-col items-center justify-center">
                          <p className=" text-neutral-400">Speed</p>
                          <p className="text-3xl">{hourly[0].wind.speed}</p>
                        </div>                     
                        <div className=" flex flex-col items-center justify-center">
                          <p className=" text-neutral-400">Min-temp</p>
                          <p className="text-3xl">{hourly[0].main.temp_max}°</p>
                        </div>                     
                        <div className=" flex flex-col items-center justify-center">
                          <p className=" text-neutral-400">Max-temp</p>
                          <p className="text-3xl">{hourly[0].main.temp_max}°</p>
                        </div>                                         
                         </div>
                      <div className="flex justify-between mt-5">
                        <div className="bg-neutral-900 px-4 py-2 rounded-2xl w-[200px]">
                          <p className="text-neutral-400">Humidity</p>
                          <div className="flex justify-between mt-9">
                            <div><Droplets size={40}/></div>
                            <div className="text-3xl">{hourly[0].main.humidity}%</div>
                          </div>
                        </div>
                        <div className="bg-neutral-900 px-4 py-2 rounded-2xl w-[200px]">
                          <p className="text-neutral-400">Pressure</p>
                          <div className="flex justify-between mt-9">
                            <div><Waves size={40}/></div>
                            <div className="text-3xl">{hourly[0].main.pressure}hPa</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2  w-[45%] min-w-[420px]">
                    <div className="flex justify-center items-center justify-between px-3 py-2">
                        <div className="text-neutral-400 py-1">Sunrise & Sunset</div>
                      </div>
                      <div className="flex justify-around p-4 items-center mt-3 rounded-2xl">
                        <div>
                          <Sun size={40}/>
                        </div>
                        <div className=" flex flex-col items-center justify-center">
                          <p className=" text-neutral-400">Sunrise</p>
                          <p className="text-3xl">{new Date(data[0].sunrise_ts * 1000).toString().slice(16,21)}</p>
                        </div>                     
                        <div>
                          <Moon size={40}/>
                        </div>               
                        <div className=" flex flex-col items-center justify-center">
                          <p className=" text-neutral-400">Sunset</p>
                          <p className="text-3xl">{new Date(data[0].sunset_ts * 1000).toString().slice(16,21)}</p>
                        </div>                     
                                           
                         </div>
                      <div className="flex justify-between mt-5">
                        <div className="bg-neutral-900 px-4 py-2 rounded-2xl w-[200px]">
                          <p className="text-neutral-400">Visibility</p>
                          <div className="flex justify-between mt-9">
                            <div><Eye size={40}/></div>
                            <div className="text-3xl">{hourly[0].visibility/1000} Km</div>
                          </div>
                        </div>
                        <div className="bg-neutral-900 px-4 py-2 rounded-2xl w-[200px]">
                          <p className="text-neutral-400">Feels Like</p>
                          <div className="flex justify-between mt-9">
                            <div><Thermometer size={40}/></div>
                            <div className="text-3xl">{hourly[0].main.feels_like}°</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="w-[100%]">
                <div className="my-5">Today at</div>
                <div className=" w-[100%] no-scrollbar flex gap-5 px-4 py-1 overflow-scroll">
                  {
                    hourly.map((item,i)=>
                      <div key={i} className="bg-stone-950 rounded-2xl flex gap-2 flex-col items-center justify-center py-4 cursor-pointer pointer-events-none select-none">
                        <p>{item.dt_txt.slice(11,16) > 12 ? item.dt_txt.slice(11,16)+ ' PM' :item.dt_txt.slice(11,16)+' AM'} </p>
                      <div className="flex gap-2">
                      <p className="text-neutral-400 text-xs">{new Date(
                    item.dt_txt.split(" ")[0]
                  )
                    .toString().slice(0,4)
                    }</p>
                      <p className="text-neutral-400 text-xs">{new Date(
                    item.dt_txt.split(" ")[0]
                  )
                    .toString().slice(3,11).split(' ').reverse().join(' ')
                    }</p>
                      
                      </div>
                        <div className=" w-[130px] flex justify-center items-center">
                          {/* <img className="w-[80px] h-[80px]"  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="" /> */}
                          <Image src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} width='80' height='80' alt="" />                        </div>
                        <p>{item.main.temp}°</p>
                      </div>
                    )
                  }
                </div>
              </div>
              <div>

              </div>
            </div>
        </div>
      ) : (
        <div className="progress">
          {/* <img src={progress} alt="" /> */}
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
}
