import { signOut } from "next-auth/react"
import { useSession} from 'next-auth/react'
import { Search, CloudSun , User, X, LogOut, SunMedium } from 'lucide-react';
import { useState } from "react";
export default function Navbar(){
    const { data: session } = useSession()
    const [show,setShow] = useState(false)
    return(
        <div>
            <div className=" sticky top-0 flex py-2 bg-black justify-between items-center">
                <div className="text-xl flex gap-1 items-center  px-2 py-1">
                <SunMedium className="sun" size={50} color="white"/>
                <h2 className="font-sans text-white p-1 text-2xl">Weathernow</h2>
                </div>
                <div className="flex justify-center items-center gap-2 rounded-full bg-neutral-900 px-5 py-2">
                    <Search color="white" size={20}/>
                    <input placeholder="Search city..." className="text-white outline-none bg-transparent w-80 h-8 border-none" type="text" />
                </div>
            {show &&<div className="absolute right-2 top-20 bg-neutral-900 text-white shadow-lg p-8 rounded flex flex-col gap-3">
            <span onClick={()=>setShow(!show)} className="cursor-pointer absolute right-3 top-3 text-white"><X/> </span>                    <div>
                        Name: <span>{session?.user?.name}</span>
                    </div>
                    <div>
                        Email: <span>{session?.user?.email}</span>
                    </div>
                    <button onClick={() => signOut()} className=" w-fit mt-2 flex justify-start items-center bg-neutral-700 px-5 py-2"><LogOut/> Log out</button>
            </div>}
            <div className=" px-4 py-2 mr-4 cursor-pointer flex gap-3 text-black justify-center items-center rounded-full bg-pink-200">
            <User onClick={()=>setShow(!show)}/>
            <span className="capitalize font-medium">{session?.user?.name}</span>
            </div>
        </div>
        </div>
    )
}