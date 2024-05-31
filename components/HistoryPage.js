import axios from "axios";
import { myWeather } from "./HomePage";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { X } from "lucide-react";
export default function HistoryPage () {
  const [getCity, setGetCity] = useState([]);
  const [Weather, setWeather] = useContext(myWeather);
  const { data: session } = useSession();
  // get weather history from mongoDB data base
  const getHistory = async () => {
    try {
        console.log(session?.user?.email)
      const response = await axios.post('/api/myhistory',{
        email:session.user.email
      });
      console.log(response.data)
      setGetCity(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHistory();
  }, [Weather,session]);

  // weather history calls
  const handleWeather = (city) => {
    let geoLocation = {
      lat: city.lat,
      lon: city.lon,
    };
    setWeather(geoLocation);
  };
  return (
    <div className="bg-neutral-900 no-scrollbar p-1 h-[45vh] overflow-scroll">
      {/* <X className="absolute rig" size={20} color="teal"/> */}
      {getCity.length?
        getCity.reverse().map((city, i) => (
          <div
            key={i}
            className="bg-neutral-900 flex items-center gap-3 py-3 border-b-2 border-neutral-800"
            onClick={() => handleWeather(city)}
            style={{ display: "flex" }}
          >
            <div className="flag">
              <Image
                src={`https://flagsapi.com/${city.country_code}/flat/64.png`}
                alt=""
                width={20}
                height={20}
              />
            </div>
            <div className="flex gap-1 items-center justify-center">
            <p className="text-white text-xs">({city.country_code})</p>
            <p className="text-neutral-400 text-xs uppercase">- {city.city_name}</p>
            </div>
          </div>
        )):<div className="progress2">
          <div>
          {/* <img src={progress} alt="" /> */}
          <div>Loading...</div>
          </div>
        </div>}
    </div>
  );
};


