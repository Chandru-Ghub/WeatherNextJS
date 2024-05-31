import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import {Search,LocateFixed,User,X,LogOut,SunMedium,MapPin, Mail} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { myWeather } from "./HomePage";
import axios from "axios";
import CurrentGeoLocation from "./CurrentGeoLocation";
import Image from "next/image";
import HistoryPage from "./HistoryPage";
export default function Navbar() {
  const { data: session } = useSession();
  const { position } = CurrentGeoLocation();
  const [profile, setProfile] = useState(false);
  const [show, setShow] = useState(true);
  const [search, setSearch] = useState("");
  const [getCity, setGetCity] = useState([]);
  const [history, setHistory] = useState(false);
  const [Weather, setWeather] = useContext(myWeather);

  // get cities from the open weather API
  const searchCities = async () => {
    setShow(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=10&appid=${process.env.NEXT_PUBLIC_APIKEY2}`
      );
      let filteredDate = response.data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setGetCity(filteredDate);
    } catch (error) {
      console.error(error);
    }
  };

  // Debouncing Techinique
  /// check from search input if exists call the function
  useEffect(() => {
    let timer = setTimeout(() => {
      if (search.trim() !== "") searchCities();
      else setShow(false);
    }, [400]);

    //cleanup function
    return () => clearTimeout(timer);
  }, [search,searchCities]);

  const resetWeather = () => {

    let geoLocation = {
      lat: position.latitude,
      lon: position.longitude,
    };
    setWeather(geoLocation);
  };

  // Get weather
  const handleWeather = async (city) => {
    setShow(false);
    setSearch("");
    let geoLocation = {
      lat: city.lat,
      lon: city.lon,
    };

    // store searched data in mongoDB data base
    setWeather(geoLocation);
    let res = await axios.post("/api/history",
      {
        email:session.user.email,
        country_code: city.country,
        lat: city.lat,
        lon: city.lon,
        city_name: city.name,
      }
    );
    console.log('HISTORY',res.data)
  };
  return (
    <div className="sticky top-0">
      <div className="stickey top-0 flex py-2 bg-black justify-between items-center">
      <div className="text-xl flex gap-1 items-center  px-2 py-0">
          <SunMedium className="sun max-lg:w-[40px]" size={50} color="#02a9a9" />
          <h2 className="font-sans text-white p-1 text-2xl italic uppercase font-bold max-md:text-lg max-sm:hidden">Weather<span className="uppercase font-bold text-teal-500">now</span></h2>
        </div>
        <div  className=" w-[35%] relative flex justify-start items-center gap-5 rounded-full bg-stone-950 px-5 py-2 max-sm:w-[60%] max-lg:py-1 max-lg">
          <Search className="max-lg:w-[14px]" color="white" size={20} />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onBlur={() => {
              setTimeout(() => {
                setShow(false);
              }, 500);
            }}
            placeholder="Search city..."
            className="text-neutral-200 outline-none bg-transparent w-80 h-8 w-[70%] max-lg:text-sm"
            type="text"
          />
          {show && (
            <div className=" bg-neutral-950  text-neutral-400 absolute left-0 top-4 mt-2 right-0 z-[-2] pt-6 shadow-neutral-900 shadow-lg">
              {getCity.map((city,i) => (
                <div key={i}
                  onClick={() => handleWeather(city)}
                  className="flex px-4 py-5 text-s border-b-2 items-center gap-2 border-stone-900 hover:bg-stone-900 cursor-pointer"
                >
                  <div>
                    <MapPin size={15} />
                  </div>
                  <div>
                    <Image
                      className="w-5"
                      src={`https://flagsapi.com/${city.country}/flat/64.png`}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex items-center  gap-2">
                  <div className="">({city.country}) - </div>
                  <div>{city.name}</div>
                  <div className="text-xs">{city.state}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {
          <div className={profile?'show':'hide'}>
          <div className="border-b-2 shadow-lg border-teal-600 shadow-sm bg-neutral-900 text-white shadow-lg p-5 rounded flex flex-col gap-3">
            <span
              onClick={() => setProfile(!profile)}
              className="cursor-pointer absolute right-3 top-2 text-white"
            >
              <X size={18} className="hover:rotate-90 transition-all" />
            </span>
            <div className="border-b-2 border-neutral-800 text-xl flex gap-1 items-center  px-2 pb-3">
          <SunMedium className="sun" size={30} color="#02a9a9" />
          <h2 className="font-sans text-white p-1 italic uppercase font-bold">Weather<span className="uppercase font-bold text-teal-500">now</span></h2>
        </div>
            <div className="flex gap-4 items-center">
              <User size={20}/><span className="capitalize text-neutral-400 text-sm">{session?.user?.name}</span>
            </div>
            <div  className="flex gap-4 items-center text-xs">
              <Mail size={19}/> <span className="text-neutral-400">{session?.user?.email}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="  flex gap-1 text-neutral-400 justify-end items-center text-s hover:gap-4 transition-all"
            >
              <LogOut color="#02a9a9" size={16}/> <span className="text-xs">Logout</span>
            </button>
            <div >
              <h3 className="text-neutral-500  text-xs flex justify-start italic border-b-2  border-neutral-800 mb-1">History</h3>
              <HistoryPage/>
            </div>
          </div>
          </div>
        }
        <div className="flex gap-3 justify-center items-center">
          <div onClick={() => resetWeather()} className="text-[14px] px-3 py-2 rounded-full mr-3 cursor-pointer flex gap-2 text-neutral-200 justify-center items-center bg-teal-700 active:translate-y-1  max-lg:px-[5px] max-lg:py-[3px] ">
            <LocateFixed className="w-[18px] hover:rotate-90 transition-all max-lg:w-[20px]" /> <span className="max-lg:hidden text-sm">Current Location</span>
          </div>
          <div className="flex items-center justify-center w-10 h-10 cursor-pointer text-neutral-500">
            <User className="max-lg:w-[20px]" onClick={() => setProfile(!profile)} />
          </div>
        </div>
      </div>
    </div>
  );
}
