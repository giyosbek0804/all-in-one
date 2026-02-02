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
  <ul className="mt-8 space-y-3">
    {data.map((item) => (
      <li
        key={item.id}
        className={`group relative flex justify-between items-center p-5 rounded-xl bg-linear-to-br transition-all duration-300 ${
          item.completed
            ? "from-base-100/40 to-base-100/20 border border-base-content/5"
            : "from-base-100/80 to-base-100/60 border border-base-content/10 shadow-lg hover:shadow-xl hover:scale-[1.01]"
        } backdrop-blur-xl`}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleComplete(item.id, item.completed)}
            className="checkbox checkbox-success transition-all duration-200 hover:scale-110"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="relative inline-block">
              <p
                className={`font-semibold text-base first-letter:uppercase truncate transition-all duration-300 ${
                  item.completed ? "opacity-40" : "opacity-100"
                }`}
              >
                {item.status}
              </p>
              {/* Strikethrough animation */}
              <span
                className={`absolute left-0 top-1/2 h-[2px] bg-base-content/60 origin-left transition-transform duration-500 ease-out ${
                  item.completed ? "scale-x-100" : "scale-x-0"
                }`}
                style={{ width: "100%" }}
              ></span>
            </div>
            <p className="text-xs opacity-60 mt-1">
              {item.timestamp?.toDate?.().toLocaleString() ?? "Just now"}
            </p>
          </div>
        </div>

        {/* Actions Menu */}
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className={`btn btn-circle btn-sm transition-all duration-200 ${
              item.completed
                ? "btn-ghost opacity-40"
                : "btn-ghost hover:btn-primary"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6h.01M12 12h.01M12 18h.01"
              />
            </svg>
          </button>

          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-box w-44 mt-2 border border-base-content/10 z-10"
          >
            <li>
              <button
                onClick={() => {
                  (
                    document.getElementById(
                      `edit-${item.id}`
                    ) as HTMLDialogElement
                  )?.showModal();
                }}
                disabled={item.completed}
                className="flex items-center gap-2 hover:bg-primary/10"
              >
                <span>✏️</span>
                <span>Edit</span>
              </button>
            </li>
            <li>
              <button className="flex items-center gap-2 hover:bg-info/10">
                <span>👁️</span>
                <span>View</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => deleteData(item.id)}
                className="flex items-center gap-2 hover:bg-error/10 text-error"
              >
                <span>🗑️</span>
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </div>

        <EditModal item={item} />
      </li>
    ))}
  </ul>
);
};

export default FetchData;
