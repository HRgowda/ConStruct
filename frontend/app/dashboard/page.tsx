"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ThingSpeaktypes {
  created_at: string,
  field1: string, // Latitude
  field2: string, // Longitude
  field3: string, // Acceleration
  field4: string // Pulse rate
}

const THINGSPEAK_URL = process.env.NEXT_PUBLIC_THINGSPEAK_URL;

export default function dashboard() {
  const router = useRouter();
  const [data, setData] = useState<ThingSpeaktypes[]>([])
  const details = ["Time", "Acceleration", "Latitude", "Longitude", "Pulse Rate"];

  async function fetchdata() {
      try{
        const response = await fetch(`${THINGSPEAK_URL}`);
        const jsonData = await response.json()
        console.log(jsonData.feeds)
        setData(jsonData.feeds);
      } catch {
        console.log("Error fetchinig the data");
      }
  }

  useEffect(() => {
    fetchdata();
    const interval = setInterval(fetchdata, 3000);
    return () => clearInterval(interval)
  }, []);

  return (
    <div className="bg-[#121212] min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-evenly border-b border-white/50 rounded-full backdrop-blur-xl">
        <h1 className="text-xl font-semibold">ConStruct</h1>
        <h1 className="font-semibold text-xl p-6 text-center">
          Smart Construction Worker Helmet Monitoring System
        </h1>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" onClick={() => {
          localStorage.removeItem("token1")
          router.push("/signin")
        }}>
          <span className="relative px-7 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Logout
          </span>
        </button>
      </div>

      {/* Table Centered */}
      <div className="flex justify-center mt-20">
        <div className="text-2xl font-semibold w-full max-w-7xl p-6">
          <table className="table-auto w-full bg-slate-700 rounded-lg overflow-hidden shadow-lg hover:shadow-white/80 duration-300 ease-in-out">
            <thead className="bg-gray-800 text-white">
              <tr>
                {details.map((item: any, index: number) => (
                  <th key={index} className="px-6 py-3 text-center border-b border-gray-600">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((entry: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-600">
                    <td className="px-6 py-3 text-center border-b border-gray-600">{new Date(entry.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hourCycle: "h12"

                    })}</td>
                    <td className="px-6 py-3 text-center border-b border-gray-600">{entry.field1 || "N/A"}</td>
                    <td className="px-6 py-3 text-center border-b border-gray-600">{entry.field2 || "N/A"}</td>
                    <td className="px-6 py-3 text-center border-b border-gray-600">{entry.field3 || "N/A"}</td>
                    <td className="px-6 py-3 text-center border-b border-gray-600">{entry.field4 || "N/A"}</td>
                  </tr>   
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-300">
                    Loading data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
