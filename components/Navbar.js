import { signOut } from "next-auth/react"
import { useSession} from 'next-auth/react'
import { Search, LocateFixed  , User, X, LogOut, SunMedium, MapPin } from 'lucide-react';
import { useContext, useEffect, useState } from "react";
import { myWeather } from "./HomePage";
import axios from "axios";
import CurrentGeoLocation from "./CurrentGeoLocation";
export default function Navbar(){
    const { data: session } = useSession()
    const { position } = CurrentGeoLocation();
    const [profile,setProfile] = useState(false)
    const [show,setShow] = useState(true)
    const [search, setSearch] = useState("");
    const [getCity, setGetCity] = useState([]);
    const [history, setHistory] = useState(false);
    const [Weather, setWeather] = useContext(myWeather);
  
    // get cities from the open weather API
    const searchCities = async () => {
      setShow(true);
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=10&appid=ebd3f17fb8cc2328925eeec13a25afe9`);
          let filteredDate = response.data.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()))
          setGetCity(filteredDate);
          console.log(filteredDate)
        } catch (error) {
          console.error(error);
        }
      
    };
  
    // Debouncing Techinique
    /// check from search input if exists call the function
    useEffect(()=>{
  
      let timer = setTimeout(()=>{
        if(search.trim()!== '')
            searchCities()
        else
          setShow(false)
  
      },[400])
  
      //cleanup function
      return ()=> clearTimeout(timer)
    },[search])
    
    const resetWeather = () =>{
        let geoLocation = {
            lat: position.latitude,
            lon: position.longitude,
          };
          setWeather(geoLocation);
    }
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
      let res = await axios.post(
        "https://weatherappserver-w46g.onrender.com/data",
        {
          country_code: city.country,
          lat: city.lat,
          lon: city.lon,
          city_name: city.name,
        }
      );
      console.log(res.data);
    };
    return(
        <div>
            <div className=" sticky top-0 flex py-2 bg-black justify-between items-center">
                <div className="text-xl flex gap-1 items-center  px-2 py-1">
                <SunMedium className="sun" size={50} color="white"/>
                <h2 className="font-sans text-white p-1 text-2xl">Weathernow</h2>
                </div>
                <div className="relative flex justify-center items-center gap-2 rounded-full bg-neutral-900 px-5 py-2">
                    <Search color="white" size={20}/>
                    <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search city..." className="text-white outline-none bg-transparent w-80 h-8 border-none" type="text" />
                        {show&&<div className=" border-t-2 border-neutral-800 bg-neutral-900 text-neutral-400 absolute left-5 top-10 mt-2 right-5">
                            {
                                getCity.map((city)=>
                                <div onClick={()=>handleWeather(city)} className="flex px-3 py-3 text-xs border-b-2 items-center gap-2 border-neutral-800 hover:bg-neutral-800 cursor-pointer">
                                    <div>
                                        <MapPin size={15}/>
                                    </div>
                                    <div>
                                    <img className="w-5"
                                    src={`https://flagsapi.com/${city.country}/flat/64.png`}
                                    alt=""
                                />
                                    </div>
                                    <div>({city.country}) - </div>
                                    <div>{city.name}</div>
                                    <div>{city.state}</div>
                                </div>
                                )
                            }
                        </div>}
                </div>
            {profile &&<div className="absolute right-2 top-20 bg-neutral-900 text-white shadow-lg p-8 rounded flex flex-col gap-3">
            <span onClick={()=>setProfile(!profile)} className="cursor-pointer absolute right-3 top-3 text-white"><X/> </span>                    <div>
                        Name: <span>{session?.user?.name}</span>
                    </div>
                    <div>
                        Email: <span>{session?.user?.email}</span>
                    </div>
                    <button onClick={() => signOut()} className=" w-fit mt-2 flex justify-start items-center bg-neutral-700 px-5 py-2"><LogOut/> Log out</button>
            </div>}
           <div className="flex gap-3">
           <div className="text-[14px] px-3 py-2 mr-4 cursor-pointer flex gap-3 text-black justify-center items-center rounded-full bg-pink-200 active:translate-y-1 hover:bg-pink-50 transition-all">
            <LocateFixed onClick={()=>resetWeather()} /> Current Location
           
            </div>
            <div className="flex items-center justify-center w-10 h-10 cursor-pointer text-neutral-500 border-2 border-neutral-500 rounded-full p-1 mr-3">
            <User size={23} onClick={()=>setProfile(!profile)} />
            </div>
           </div>
            
        </div>
        </div>
    )
}