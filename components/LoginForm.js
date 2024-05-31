"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import img from "../images/open.png";
import { SunMedium } from "lucide-react";
import Image from "next/image";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  //handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials");
        return;
      }
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="grid place-items-center h-screen bg-stone-900">
      <div className="p-5 border-t-4 bg-stone-950 text-white border-teal-600 shadow-lg rounded-lg">
        <div className="text-xl flex gap-1 items-center  px-2 py-0">
          <SunMedium className="sun" size={50} color="#02a9a9" />
          <h2 className="font-sans text-white p-1 text-2xl italic uppercase font-bold">
            Weather
            <span className="uppercase font-bold text-teal-500">now</span>
          </h2>
        </div>
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="w-[400px] border border-neutral-600 py-2 outline-none px-6 bg-transparent"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            className="w-[400px] border border-neutral-600 py-2 outline-none px-6 bg-transparent"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button className="bg-teal-600 text-white cursor-pointer py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-sm mt-2">
              {error}
            </div>
          )}
          <Link
            className="text-neutral-400 text-sm mt-3 text-right"
            href={"/register"}
          >
            Don&apos;t have an account?{" "}
            <span className="underline ">Register</span>
          </Link>
        </form>
      </div>
      <div className="absolute top-10 right-10  text-stone-300 text-sm border-2 border-stone-800 p-3 rounded-md">
        <h3 className="text-stone-500 uppercase text-xs mb-1">
          Demo credentials{" "}
        </h3>
        <p className="italic">
          {" "}
          <span className="text-teal-500">Email:</span>chandruinfo455@gmail.com
        </p>
        <p className="italic">
          {" "}
          <span className="text-teal-500">Password:</span>12345
        </p>
      </div>
      <div className="text-neutral-400 absolute bottom-1 right-10 flex gap-3 items-center justify-center text-xs">
        <p>Powered By </p>
        <Image src={img} width={35} height={35} />
        <p>Open Weather</p>
      </div>
    </div>
  );
}
