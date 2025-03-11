"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ThingSpeaktypes {
  created_at: string;
  field1: string; // Latitude
  field2: string; // Longitude
  field3: string; // Acceleration
  field4: string; // Pulse rate
}

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<ThingSpeaktypes[]>([]);
  const details = ["Time", "Latitude", "Longitude", "Acceleration", "Pulse Rate"];

  function generateDummyData() {
    const dummyData: ThingSpeaktypes[] = Array.from({ length: 5 }, (_, i) => ({
      created_at: new Date().toISOString(),
      field1: "12.881626", // Fixed Latitude
      field2: "77.444617", // Fixed Longitude
      field3: (Math.random() * 10).toFixed(2), // Random Acceleration
      field4: (Math.floor(Math.random() * (120 - 60 + 1)) + 60).toString(), // Random Pulse Rate between 60 and 120
    }));
    return dummyData;
  }

  useEffect(() => {
    setData(generateDummyData());
    const interval = setInterval(() => {
      setData(generateDummyData());
    }, 2000); // Update dummy data every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#121212] min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-evenly border-b border-white/50 rounded-full backdrop-blur-xl">
        <h1 className="text-xl font-semibold">ConStruct</h1>
        <h1 className="font-semibold text-xl p-6 text-center">
          Smart Construction Worker Helmet Monitoring System
        </h1>
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => {
            localStorage.removeItem("token1");
            router.push("/signin");
          }}
        >
          <span className="relative px-7 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Logout
          </span>
        </button>
      </div>

      {/* Table Section */}
      <div className="flex justify-center mt-20">
        <div className="text-2xl font-semibold w-full max-w-7xl p-6">
          <table className="table-auto w-full bg-slate-700 rounded-lg overflow-hidden shadow-lg hover:shadow-white/80 duration-300 ease-in-out">
            <thead className="bg-gray-800 text-white">
              <tr>
                {details.map((item, index) => (
                  <th key={index} className="px-6 py-3 text-center border-b border-gray-600">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-600">
                  <td className="px-6 py-3 text-center border-b border-gray-600">
                    {new Date(entry.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hourCycle: "h12",
                    })}
                  </td>
                  <td className="px-6 py-3 text-center border-b border-gray-600">{entry.field1}</td>
                  <td className="px-6 py-3 text-center border-b border-gray-600">{entry.field2}</td>
                  <td className="px-6 py-3 text-center border-b border-gray-600">{entry.field3 || "N/A"}</td>
                  <td className="px-6 py-3 text-center border-b border-gray-600">{entry.field4 || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
