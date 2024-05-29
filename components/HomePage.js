'use client'

import { createContext, useState } from "react"
import Navbar from "./Navbar"
import WeatherDetails from "./WeatherDetails"
export const myWeather = createContext()

export default function HomePage(){
    const [Weather,setWeather] = useState('')
    return(
        <>
        <myWeather.Provider value={[Weather,setWeather]}>

        <Navbar/>
        <WeatherDetails/>
        </myWeather.Provider>
        </>
    )
}