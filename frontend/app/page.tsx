"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("token1");

    if(token){
      router.push("/dashboard");
    } else {
      router.push("/signin")
    }
  })

  return 
}