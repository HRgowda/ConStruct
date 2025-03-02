"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { BACKEND_URL } from "../signin/page"

export default function SingIn() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassWord] = useState("")
    const router = useRouter()
    const handleClick = async () => {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/owner_signup`, {
                email, name, password
            })

            if(response.data.status === 200) {
                // localStorage.setItem("token1", response.data.token)
                router.push("/dashboard")
            }

        } catch (error: any) {
            console.log("error", error)
        }
    }
    return <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-transparent to-transparent">
        <div className="rounded-xl w-86 p-4">
            {/* <h1 className="text-2xl text-white text-center">Sign In</h1> */}
            <h2 className="text-2xl text-white fonr-semibold mb-4 text-center">Welcome to ConStruct !</h2>
            <p className="text-center text-lg text-center">Create your account to start.</p>

            <form action="rounded-lg shadow-lg flex justify-center items-center">
            <div className="mt-8">
                    <label htmlFor="">Name</label>
                    <div className="mt-2">
                        <input type="email" placeholder="John" className="border border-wihte rounded-lg p-1 w-full" onChange={(e) => {
                            setName(e.target.value)
                        }}></input>
                    </div>
                </div>
                <div className="mt-8">
                    <label htmlFor="">Email</label>
                    <div className="mt-2">
                        <input type="email" placeholder="john@gmail.com" className="border border-wihte rounded-lg p-1 w-full" onChange={(e) => {
                            setEmail(e.target.value)
                        }}></input>
                    </div>
                </div>

                <div className="mt-8">
                    <label htmlFor="">Password</label>
                    <div className="mt-2">
                        <input type="password" id="password" placeholder="Password" className="border border-white rounded-lg p-1 w-full" onChange={(e) => {
                            setPassWord(e.target.value)
                        }}></input>
                    </div>
                </div>
                <Link href={"/dashboard"}>
                <button className="text-white bg-blue-600 rounded-full px-8 py-2 mt-4 w-full hover:bg-blue-800 cursor-pointer" onClick={handleClick}>
                    SignUp
                </button>
                </Link>
                
                <div className="flex mt-6 gap-2 text-center">
                    <p className="">Already have an account?</p>
                    <a href="/signin" className="text-blue-500 hover:underline">SignIn</a>
                </div>
            </form>
        </div>
    </div>
}