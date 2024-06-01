import { useContext, useEffect, useState } from "react";
import { myWeather } from "./HomePage";
import {
  Calendar,
  MapPin,
  Sun,
  Moon,
  Wind,
  Waves,
  Droplets,
  Thermometer,
  Eye,
  Feather,
  SunMedium,
} from "lucide-react";
import CurrentGeoLocation from "./CurrentGeoLocation";
import axios from "axios";
import Image from "next/image";
import img from "../images/open.png";

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
          `https://api.weatherbit.io/v2.0/forecast/daily?days=7&lat=${lat}&lon=${lon}&key=${process.env.NEXT_PUBLIC_APIKEY}`
        );

        let res1 = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_APIKEY2}&units=metric`
        );
        const hourlyForeCast = [];
        const fiveDayForecast = res1.data.list.filter((item) => {
          const filteredData = new Date(item.dt_txt).getDate();
          if (date == filteredData || date + 1 == filteredData) {
            return hourlyForeCast.push(filteredData);
          }
        });
        setHourly(fiveDayForecast);
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
    <div className="">
      {data.length ? (
        <div className="bg-black px-5  pt-5 flex gap-5 justify-around max-[505px]:flex-wrap">
          <div className="p-1 w-[22%] max-xl:p-2 max-[1040px]:w-[50%] max-[815px]:w-[40%] max-[640px]:p-1 max-[505px]:w-[100%] max-[505px]:px-4">
            <div className=" text-white bg-stone-950 w-[100%] px-5 py-3 rounded-3xl ">
              {data.length ? (
                <div className="temp-datas">
                  <span className="max-[640px]:text-xs max-[505px]:text-xl">
                    Now
                  </span>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex gap-3">
                      <p className="text-5xl max-xl:text-3xl max-[640px]:text-2xl max-[505px]:text-7xl max-[405px]:text-5xl">
                        {data[0].temp}
                      </p>
                      <span className="text-3xl max-xl:text-xl max-[640px]:text-lg max-[505px]:text-2xl">
                        °c
                      </span>
                    </div>
                    <div className="">
                      <Image
                        className="w-20 max-xl:w-[60px] max-[640px]:w-[50px] max-[505px]:w-[150px]"
                        src={`http://openweathermap.org/img/wn/${hourly[0].weather[0].icon}@2x.png`}
                        alt="/"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                  <p className="px-1 pb-3 border-b-2 border-neutral-800 mt-2 font-medium capitalize max-xl:text-sm max-[640px]:text-xs max-[505px]:text-lg max-[505px]:mt-0">
                    {data[0].weather.description}
                  </p>
                  <div className="mt-2">
                    <div className="flex gap-2 p-2 ">
                      <p>
                        <Calendar className="mr-1 max-xl:w-[18px] max-[640px]:w-[15px] max-[505px]:w-[25px]" />
                      </p>
                      <p className="text-neutral-400 max-xl:text-sm max-[505px]:text-lg">
                        {day}
                      </p>
                      <p className="text-neutral-400 max-xl:text-sm max-[505px]:text-lg">
                        {date},
                      </p>
                      <p className="text-neutral-400 max-xl:text-sm max-[505px]:text-lg">
                        {month}
                      </p>
                    </div>
                    <div className="flex gap-2 p-2 items-center max-[640px]:gap-1 max-[505px]:gap-2">
                      <p>
                        <MapPin className="mr-1 max-xl:w-[18px] max-[640px]:w-[15px] max-[505px]:w-[25px] " />
                      </p>
                      <p className="text-neutral-400 max-xl:text-sm max-[640px]:text-xs max-[505px]:text-lg">
                        {country.city_name ? country.city_name : "Location"},
                      </p>
                      <p className="text-neutral-400 max-xl:text-sm max-[505px]:text-lg">
                        {country.country_code}
                      </p>
                      <Image
                        className="w-7 h-7 max-xl:w-5 max-xl:h-5 max-[640px]:w-4 max-[640px]:h-4 max-[505px]:w-6 max-[505px]:h-6"
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
              <p className="w-fit my-2 pl-3 text-white text-sm capitalize max-[640px]:text-sm">
                7 Days forecast
              </p>
            </div>

            <div className="bg-stone-950 px-3 py-2 mt-4 rounded-3xl w-[100%]  cursor-pointer overflow-scroll no-scrollbar">
              {data.slice(1).map((list, i) => (
                <div key={i} className="px-1 py-1 flex mt-2 justify-between">
                  <div className="flex items-center justify-center gap-2 max-xl:gap-5 max-[640px]:gap-1 max-[505px]:gap-5">
                    <Image
                      className="w-12 max-xl:w-[35px] max-[640px]:w-[30px] max-[505px]:w-[60px]"
                      src={`https://cdn.weatherbit.io/static/img/icons/${list.weather.icon}.png`}
                      width={80}
                      height={80}
                      alt=""
                    />
                    <p className="text-white max-xl:text-xs max-[640px]:text-[10px] max-[505px]:text-lg">
                      {list.temp} °c{" "}
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center items-center mx-2 max-xl:text-xs">
                    <p className="text-neutral-400 max-xl:text-xs max-[640px]:text-[10px] max-[505px]:text-lg">
                      {
                        new Date(
                          list.datetime.split("-")[0],
                          list.datetime.split("-")[1] - 1,
                          list.datetime.split("-")[2]
                        )
                          .toString()
                          .split(" ")[2]
                      }
                    </p>
                    <p className="text-neutral-400 max-xl:text-xs max-[640px]:text-[10px] max-[505px]:text-lg">
                      {
                        new Date(
                          list.datetime.split("-")[0],
                          list.datetime.split("-")[1] - 1,
                          list.datetime.split("-")[2]
                        )
                          .toString()
                          .split(" ")[1]
                      }
                    </p>
                  </div>
                  <p className=" text-neutral-400 flex items-center justify-center max-xl:text-xs max-[640px]:text-[10px] max-[505px]:text-xs">
                    {
                      new Date(
                        list.datetime.split("-")[0],
                        list.datetime.split("-")[1] - 1,
                        list.datetime.split("-")[2]
                      )
                        .toString()
                        .split(" ")[0]
                    }
                  </p>
                </div>
              ))}
            </div>
            <div className="country-location-time"></div>
          </div>

          <div className="text-white rounded-3xl flex flex-col w-[73%] max-[815px]:w-[60%] max-[505px]:w-[100%]">
            <div className="bg-stone-950 py-3 rounded-3xl w-[100%]">
              <h2 className="font-medium px-5">Today Highlights</h2>
              <div className="flex gap-2 flex-wrap justify-around">
                <div className=" p-2 w-[49%] max-[815px]:w-[100%]">
                  <div className=" flex justify-center items-center justify-between px-3 py-2 ">
                    <div className="text-neutral-400 max-xl:text-sm">
                      Air Quality Index
                    </div>
                    <div className="bg-green-600 rounded-2xl px-3 py-1 max-xl:text-sm">
                      Good
                    </div>
                  </div>
                  <div className="flex gap-5 p-4 justify-between  items-center mt-3 rounded-2xl ">
                    <div>
                      <Wind
                        className="max-[1080px]:w-[30px] max-lg:w-[20px] max-[815px]:w-[35px]"
                        size={40}
                      />
                    </div>
                    <div className=" flex flex-col items-center justify-center ">
                      <p className=" text-neutral-400 max-xl:text-sm max-[1080px]:text-xs max-lg:text-[10px]">
                        Speed
                      </p>
                      <p className="text-3xl max-xl:text-xl max-lg:text-sm max-[815px]:text-xl">
                        {hourly[0].wind.speed}
                      </p>
                    </div>
                    <div className=" flex flex-col items-center justify-center">
                      <p className=" text-neutral-400 max-xl:text-sm max-[1080px]:text-xs max-lg:text-[10px]">
                        Min-temp
                      </p>
                      <p className="text-3xl max-xl:text-xl max-lg:text-sm max-[815px]:text-xl">
                        {hourly[0].main.temp_max}°
                      </p>
                    </div>
                    <div className=" flex flex-col items-center justify-center">
                      <p className=" text-neutral-400 max-xl:text-sm max-[1080px]:text-xs max-lg:text-[10px]">
                        Max-temp
                      </p>
                      <p className="text-3xl max-xl:text-xl max-lg:text-sm max-[815px]:text-xl">
                        {hourly[0].main.temp_max}°
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-5 gap-2">
                    <div className="bg-neutral-900 w-[50%] px-2 py-2 rounded-2xl flex flex-col gap-8 max-xl:gap-5 max-lg:gap-3 ">
                      <p className=" text-neutral-400 max-xl:text-sm max-[1080px]:text-xs">
                        Humidity
                      </p>
                      <div className=" flex justify-between mt items-center px-2">
                        <div>
                          <Droplets
                            className="max-xl:w-[40px] max-[1080px]:w-[30px] max-lg:w-[20px] max-[815px]:w-[30px]"
                            size={40}
                          />
                        </div>
                        <div className="text-3xl max-xl:text-xl max-lg:text-sm max-[815px]:text-xl">
                          {hourly[0].main.humidity}%
                        </div>
                      </div>
                    </div>
                    <div className="bg-neutral-900 w-[50%] px-4 py-2 rounded-2xl flex flex-col gap-8 max-xl:gap-5 max-lg:gap-3">
                      <p className="text-neutral-400 max-xl:text-sm max-[1080px]:text-xs ">
                        Pressure
                      </p>
                      <div className="flex justify-between mt items-center px-0">
                        <div>
                          <Waves
                            className="max-xl:w-[35px] max-[1080px]:w-[30px] max-lg:w-[20px] max-[815px]:w-[35px]"
                            size={40}
                          />
                        </div>
                        <div className="text-3xl max-xl:text-xl max-[1080px]:text-sm max-lg:text-xs max-[815px]:text-xl">
                          {hourly[0].main.pressure}hPa
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" p-2 w-[49%] max-[815px]:w-[100%]">
                  <div className="flex justify-center items-center justify-between px-3 py-2">
                    <div className="text-neutral-400 py-1 max-xl:text-sm max-[1080px]:text-xs ">
                      Sunrise & Sunset
                    </div>
                  </div>
                  <div className="flex justify-around p-4 items-center mt-3 rounded-2xl">
                    <div>
                      <Sun
                        className="max-xl:w-[40px] max-[1080px]:w-[30px] max-lg:w-[20px] max-[815px]:w-[35px]"
                        size={40}
                      />
                    </div>
                    <div className=" flex flex-col items-center justify-center">
                      <p className=" text-neutral-400 max-xl:text-sm max-[1080px]:text-xs max-lg:text-[10px]">
                        Sunrise
                      </p>
                      <p className="text-3xl max-xl:text-xl max-lg:text-sm max-[815px]:text-xl">
                        {new Date(data[0].sunrise_ts * 1000)
                          .toString()
                          .slice(16, 21)}
                      </p>
                    </div>
                    <div>
                      <Moon
                        className="max-xl:w-[40px] max-[1080px]:w-[30px] max-lg:w-[20px] max-[815px]:w-[35px]"
                        size={40}
                      />
                    </div>
                    <div className=" flex flex-col items-center justify-center">
                      <p className=" text-neutral-400 max-xl:text-sm max-[1080px]:text-xs max-lg:text-[10px]">
                        Sunset
                      </p>
                      <p className="text-3xl max-xl:text-xl max-lg:text-sm max-[815px]:text-xl">
                        {new Date(data[0].sunset_ts * 1000)
                          .toString()
                          .slice(16, 21)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-5 gap-2">
                    <div className="bg-neutral-900 px-4 py-2 rounded-2xl flex flex-col gap-8 w-[50%] max-xl:gap-5 max-lg:gap-3">
                      <p className="text-neutral-400 max-xl:text-sm max-[1080px]:text-xs">
                        Visibility
                      </p>
                      <div className="flex justify-between mt items-center px-1">
                        <div>
                          <Eye
                            className="max-xl:w-[40px] max-[1080px]:w-[30px] max-lg:w-[20px] max-[815px]:w-[35px]"
                            size={40}
                          />
                        </div>
                        <div className="text-3xl max-xl:text-xl max-lg:text-sm max-[815px]:text-xl">
                          {(hourly[0].visibility / 1000).toFixed(2)} Km
                        </div>
                      </div>
                    </div>
                    <div className="bg-neutral-900 px-4 py-2 rounded-2xl flex flex-col gap-8 w-[50%] max-xl:gap-5 max-lg:gap-3">
                      <p className="text-neutral-400 max-xl:text-sm max-[1080px]:text-xs">
                        Feels Like
                      </p>
                      <div className="flex justify-between mt items-center px-1">
                        <div>
                          <Thermometer
                            className="max-xl:w-[38px] max-[1080px]:w-[30px] max-lg:w-[20px] max-[815px]:w-[35px]"
                            size={40}
                          />
                        </div>
                        <div className="text-3xl max-xl:text-xl max-lg:text-sm max-[815px]:text-xl">
                          {hourly[0].main.feels_like}°
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%] ">
              <div className="my-4 ml-5">Today at</div>
              <div className=" w-[100%] mb-4 no-scrollbar flex gap-5 py-1 overflow-scroll">
                {hourly.map((item, i) => (
                  <div
                    key={i}
                    className="text-sm bg-stone-950 rounded-2xl flex gap-2 flex-col items-center justify-center py-2 cursor-pointer pointer-events-none select-none"
                  >
                    <p>
                      {item.dt_txt.slice(11, 16) > 12
                        ? item.dt_txt.slice(11, 16) + " PM"
                        : item.dt_txt.slice(11, 16) + " AM"}{" "}
                    </p>
                    <div className="flex gap-2">
                      <p className="text-neutral-400 text-xs">
                        {new Date(item.dt_txt.split(" ")[0])
                          .toString()
                          .slice(0, 4)}
                      </p>
                      <p className="text-neutral-400 text-xs">
                        {new Date(item.dt_txt.split(" ")[0])
                          .toString()
                          .slice(3, 11)
                          .split(" ")
                          .reverse()
                          .join(" ")}
                      </p>
                    </div>
                    <div className=" w-[120px] h-[45px] flex justify-center items-center">
                      <Image
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        width="70"
                        height="70"
                        alt=""
                      />{" "}
                    </div>
                    <p>{item.main.temp}°</p>
                  </div>
                ))}
              </div>
              <div className=" w-[100%] no-scrollbar flex gap-5  py-1 overflow-scroll">
                {hourly.map((item, i) => (
                  <div
                    key={i}
                    className="text-sm bg-stone-950 rounded-2xl flex gap-2 flex-col items-center justify-center py-2 cursor-pointer pointer-events-none select-none"
                  >
                    <p>
                      {item.dt_txt.slice(11, 16) > 12
                        ? item.dt_txt.slice(11, 16) + " PM"
                        : item.dt_txt.slice(11, 16) + " AM"}{" "}
                    </p>
                    <div className="flex gap-2">
                      <p className="text-neutral-400 text-xs">
                        {new Date(item.dt_txt.split(" ")[0])
                          .toString()
                          .slice(0, 4)}
                      </p>
                      <p className="text-neutral-400 text-xs">
                        {new Date(item.dt_txt.split(" ")[0])
                          .toString()
                          .slice(3, 11)
                          .split(" ")
                          .reverse()
                          .join(" ")}
                      </p>
                    </div>
                    <div className=" w-[120px] h-[45px] flex justify-center items-center">
                      <Feather color="#02a9a9"/>
                    </div>
                    <p>{Math.ceil(item.wind.speed*3.6)} Kmph</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed h-screen top-0 z-[100] bg-black right-0 left-0 bottom-0 flex flex-col justify-center items-center">
          <div className="text-xl flex gap-1 items-center  px-2 py-0 ">
            <SunMedium
              className="sun max-lg:w-[40px]"
              size={50}
              color="#02a9a9"
            />{" "}
          </div>
          <h2 className="font-sans text-white p-1 text-2xl italic uppercase font-bold max-md:text-lg max-sm:hidden">
            Load
            <span className="uppercase font-bold text-teal-500">ing...</span>
          </h2>
          <div className="text-neutral-400 absolute bottom-1 right-10 flex gap-3 items-center justify-center text-xs">
            <p>Powered By </p>
            <Image src={img} width={35} height={35} />
            <p>Open Weather</p>
          </div>
        </div>
      )}
      <div className="bg-black pl-5 text-neutral-400  flex p-3 items-center justify-between text-xs">
        <div>
        &copy; Copy Right {year} Made with 💙 by Chandru 
        </div>
        <div className="flex items-center justify-center pr-12 gap-3">
        <p >Powered By </p>
        <Image src={img} width={35} height={35} />
        <p>Open Weather</p> 
        </div>
      </div>
    </div>
  );
}
