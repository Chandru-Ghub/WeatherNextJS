import Link from "next/link";

export default function LoginForm() {
  return (
    <div class = "grid place-items-center h-screen">
        <div className="p-5 border-t-4 border-green-400 shadow-lg rounded-lg">
            <h1 className="text-xl font-bold my-4">Login Here!</h1>

            <form className="flex flex-col gap-3">
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="password" />
                <button className="bg-green-600 text-white cursor-pointer py-2">Login</button>
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-sm mt-2">
                    Error message
                </div>
                <Link className="text-sm mt-3 text-right" href={'/register'}>
                Don't have an account? <span className="underline">
                    Register
                </span>
                </Link>
            </form>
        </div>
    </div>
  )
}
