"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("")

    const router = useRouter();

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents default form submission

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/owner_signin`, {
                email, password
            });

            if (response.status === 200) {
                localStorage.setItem("token1", response.data.token)
                router.push("/dashboard");
            } else {
                alert("Incorrect inputs");
            }
        } catch (error: any) {
            console.error("Error:", error.response?.data?.message || "Something went wrong");
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-transparent to-transparent">
            <div className="rounded-xl w-86 p-4">
                <h2 className="text-2xl text-white font-semibold mb-4 text-center">Welcome back!</h2>
                <h4 className="text-center text-lg">Sign in to access your account.</h4>

                <form className="rounded-lg shadow-lg flex flex-col items-center mt-4" onSubmit={handleClick}>
                    <div className="mt-4 w-full"> 
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="john@gmail.com" 
                            className="border border-white rounded-lg p-2 w-full" 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mt-4 w-full">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="border border-white rounded-lg p-2 w-full" 
                            onChange={(e) => {
                                setPassWord(e.target.value)
                            }}
                        />
                    </div>

                    <button 
                        type="submit"
                        className="text-white bg-blue-600 rounded-full px-8 py-2 mt-4 w-full hover:bg-blue-800 cursor-pointer"
                    >
                        Sign In
                    </button>

                    <div className="flex mt-6 gap-2">
                        <p>Don't have an account?</p>
                        <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
