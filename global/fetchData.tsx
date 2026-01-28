"use client";

import { useEffect, useState } from "react";
import { useDataStore } from "./useStore";

const FetchData = () => {
  const { data, fetchData, loading, deleteData, editData } = useDataStore();

  const [openId, setOpenId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  // fetch once
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && data.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <ul className="mt-8 space-y-4 font-outfit">
      {data.map((item) => (
        <li
          key={item.id}
          className="
            relative flex items-center justify-between p-4
            bg-base-100/60 backdrop-blur-md
            rounded-2xl shadow-lg
            border border-base-content/10
            animate-in fade-in slide-in-from-bottom-2
          "
        >
          {/* LEFT */}
          <div className="flex flex-col gap-1 pr-12">
            <p className="font-bold text-base-content first-letter:capitalize">
              {item.status}
            </p>
            <p className="text-xs opacity-70">
              {item.timestamp?.toDate
                ? item.timestamp.toDate().toLocaleString(undefined, {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })
                : "Just now"}
            </p>
          </div>

          {/* RIGHT – ACTION MENU */}
          <div className="relative  ">
            <button
              className="btn  btn-sm btn-circle btn-ghost text-xl"
              onClick={() =>
                setOpenId(openId === item.id ? null : item.id)
              }
            >
              ⋮
            </button>

            {openId === item.id && (
              <div
                className="
                  absolute top-[-20] left-10 z-50 w-44
                  flex flex-col gap-1 p-2
                  bg-base-100/30 backdrop-blur-xl
                  border border-base-content/20
                  ring-1 ring-base-content/10
                  shadow-2xl rounded-xl
                  animate-in fade-in zoom-in-95
                "
              >
                {/* Delete */}
                <button
                  onClick={() => {
                    deleteData(item.id);
                    setOpenId(null);
                  }}
                  className="
                    btn btn-sm btn-error btn-outline
                    w-full justify-start gap-2
                  "
                >
                  🗑️ Delete
                </button>


                {/* Edit */}
                <button
                  onClick={() => {
                    setEditValue(item.status);
                    setOpenId(null);
                    (
                      document.getElementById(
                        `edit-${item.id}`
                      ) as HTMLDialogElement
                    )?.showModal();
                  }}
                  className="
                    btn btn-sm btn-ghost
                    w-full justify-start gap-2
                    hover:bg-primary/10 hover:text-primary
                  "
                >
                  ✏️ Edit
                </button>

                {/* View */}
                <button
                  className="
                    btn btn-sm btn-ghost
                    w-full justify-start gap-2
                    hover:bg-secondary/10 hover:text-secondary
                  "
                >
                  👁️ View
                </button>
              </div>
            )}
          </div>

          {/* EDIT MODAL */}
          <dialog id={`edit-${item.id}`} className="modal">
            <div className="modal-box bg-base-100/80 backdrop-blur-xl">
              <h3 className="font-bold text-lg mb-4">Edit Status</h3>

              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Update status..."
              />

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-ghost">Cancel</button>
                </form>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    editData(item.id, editValue);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </dialog>
        </li>
      ))}
    </ul>
  );
};

export default FetchData;
