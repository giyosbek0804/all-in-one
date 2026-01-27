"use client";

import { useEffect } from "react";
import { useDataStore } from "./useStore"; // Make sure the path is correct

const FetchData = () => {
  // 1. Pull the shared data and the fetch function from Zustand
  const { data, fetchData, loading, deleteData} = useDataStore();

  // 2. Fetch data only once when the component first loads
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading && data.length === 0) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  return (
    <ul className="mt-8 space-y-4 font-outfit">
      {data.map((item) => (
        <li
          key={item.id}
          className="card bg-base-200 p-4 shadow-sm flex-row justify-between items-center animate-in fade-in slide-in-from-bottom-2"
        >
          <div>
            <p className="font-bold text-base-content">{item.status}</p>
            <p className="text-xs opacity-70">
              {item.timestamp?.toDate
                ? item.timestamp.toDate().toLocaleString()
                : "Just now"}
            </p>
          </div>
          

          <button onClick={() => deleteData(item.id)} className="btn btn-ghost btn-sm text-error">Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default FetchData;