"use client";

import { useState, useEffect } from "react"; // Added useEffect
import { useGlobalStore } from "./zustandStore";

export function EditModal({ item }: { item: any }) {
  // Use taskId instead of id
  const [value, setValue] = useState(item.title || item.status);
  const editData = useGlobalStore((s) => s.editData);

  // Sync state when the item changes
  useEffect(() => {
    setValue(item.title || item.status);
  }, [item]);

  return (
    <dialog id={`edit-${item.taskId}`} className="modal">
      {" "}
      {/* Fixed ID */}
      <div className="modal-box bg-base-100/80 backdrop-blur-xl">
        <h3 className="font-bold text-lg mb-4">Edit Task</h3>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input input-bordered text-wrap w-full min-h-30 resize-none p-2"
        />

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost">Cancel</button>
          </form>

          <button
            className="btn btn-primary"
            onClick={async () => {
              // Ensure we are sending an object if your Zustand store expects one
              // Based on your checkbox logic: editData(id, { status: ... })
              await editData(item.taskId, { title: value });

              (
                document.getElementById(
                  `edit-${item.taskId}` // Fixed ID
                ) as HTMLDialogElement
              )?.close();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}
