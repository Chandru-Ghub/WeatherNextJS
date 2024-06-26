"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import img from "../images/open.png";
import { ShieldX, SunMedium } from "lucide-react";
import Image from "next/image";
export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary!");
      return;
    }
    try {
      const res = await axios.post("/api/register", { name, password, email });
      console.log(res.data);
      if (res.data.message != "Email Already exists!") {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        setError(res.data.message);
        console.log("Registration failed");
      }
    } catch (err) {
      console.log("Registration failed check network", err);
    }
  };
  return (
    <div class="grid place-items-center h-screen bg-black">
      <div className="p-5 border-t-4 bg-stone-950 text-white border-teal-600 shadow-lg rounded-lg">
        <div className="text-xl flex gap-1 items-center  px-2 py-0">
          <SunMedium className="sun" size={50} color="#02a9a9" />
          <h2 className="font-sans text-white p-1 text-2xl italic uppercase font-bold">
            Weather
            <span className="uppercase font-bold text-teal-500">now</span>
          </h2>
        </div>
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="w-[400px] border border-neutral-600 py-2 outline-none px-6 bg-transparent max-sm:w-[300px] max-[450px]:w-[250px]"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="User Name"
          />
          <input
            className="w-[400px] border border-neutral-600 py-2 outline-none px-6 bg-transparent max-sm:w-[300px] max-[450px]:w-[250px]"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            className="w-[400px] border border-neutral-600 py-2 outline-none px-6 bg-transparent max-sm:w-[300px] max-[450px]:w-[250px]"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-teal-600 text-white cursor-pointer py-2 active:translate-y-1 hover:opacity-90">
            Register
          </button>
          {error && (
            <div className="text-red-500 text-white w-fit text-sm py-1 px-3 rounded-sm mt-2 flex items-center gap-2 text-xs">
            <ShieldX size={18}/>{error}
            </div>
          )}
          <Link className="text-neutral-400 text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">login</span>
          </Link>
        </form>
      </div>

      <div className="text-neutral-400 absolute bottom-1 right-10 flex gap-3 items-center justify-center text-xs">
        <p>Powered By </p>
        <Image src={img} width={35} height={35} />
        <p>Open Weather</p>
      </div>
    </div>
  );
}
