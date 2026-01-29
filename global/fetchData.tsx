"use client";

import { useEffect, useState } from "react";
import { useDataStore } from "./useStore";
import { EditModal } from "./editData"; 

const FetchData = () => {
  const { data, fetchData, loading, deleteData, toggleComplete } = useDataStore();
// const [completed, setCompleted]=useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && data.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <ul className="mt-8 space-y-4">
      {data.map((item) => (
        <li
          key={item.id}
          className={`relative flex justify-between p-4 rounded-2xl bg-base-100/60 backdrop-blur-md border border-base-content/10 cursor-pointer  duration-300 ${item.completed ? "" : "shadow-lg"} `}
        >
          <div className="flex items-center gap-4">

<input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleComplete(item.id, item.completed)}
              className={`checkbox  checked:border-success checked:bg-success checked:text-white ${item.completed ? "opacity-50" : ""}`}
/>
          {/* LEFT */}
          <div className="">

              <p className={`font-bold relative first-letter:uppercase line-clamp-1 ${item.completed ? "opacity-60" : ""} `}>{item.status} <span className={`h-[calc(.08rem+.08vw)] bg-black origin-left  absolute left-0 top-3 w-full duration-300 ${item.completed ? "scale-x-100" : "scale-x-0"}`}></span></p>
            <p className="text-xs opacity-70">
              {item.timestamp?.toDate?.().toLocaleString() ?? "Just now"}
            </p>
          </div>
          </div>

          {/* RIGHT */}
          <div className="relative fab top-0 left-0 ml-4">

             <div tabIndex={0} role="button" className="btn btn-md btn-circle btn-primary relative ">⋮</div>


              <div className="absolute  w-max flex flex-col bg-base-100 backdrop-blur-2xl top-0 left-15">

                  <button    onClick={() => {
                    deleteData(item.id);
                  
                  }} className="btn btn-md w-full bg-base-200">🗑️ Delete</button>
  <button    onClick={() => {
                    (
                      document.getElementById(
                        `edit-${item.id}`
                      ) as HTMLDialogElement
                    )?.showModal();
                  }} className={`btn btn-md w-full `}  disabled={item.completed}>✏️ Edit</button>
  <button className="btn btn-md w-full"> 👁️ view</button>
              </div>

          </div>
          <EditModal item={item} />
        </li>
      ))}
    </ul>
  );
};

export default FetchData;
