'use client'

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter} from 'next/navigation';
export default function LoginForm() {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const router = useRouter()

    //handle Login
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!email || !password){
            setError('All fields are required')
            return
        }

        try {
            const res = await signIn('credentials',{
                email,password, redirect: false,
            })

            if(res.error){
                setError('Invalid credentials')
                return
            }
            router.replace('dashboard')
        } catch (error) {
            console.log(error)
        }   
    }
  return (
    <div class = "grid place-items-center h-screen">
        <div className="p-5 border-t-4 border-green-400 shadow-lg rounded-lg">
            <h1 className="text-xl font-bold my-4">Login Here!</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Email" />
                <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password" />
                <button  className="bg-green-600 text-white cursor-pointer py-2">Login</button>
                {error && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-sm mt-2">
                   {error}
                </div>}
                <Link  className="text-sm mt-3 text-right" href={'/register'}>
                Don't have an account? <span className="underline">
                    Register
                </span>
                </Link>
                <Link href={'/dashboard'}>Dashboard</Link>
            </form>
        </div>
    </div>
  )
}
