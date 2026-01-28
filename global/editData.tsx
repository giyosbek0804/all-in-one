"use client";
import { useState } from "react";
import { useDataStore } from "./useStore"; 

export function EditModal({ item }: { item: any }) {
  const [value, setValue] = useState(item.status);
  const editData = useDataStore((s) => s.editData);

  return (
    <dialog id={`edit-${item.id}`} className="modal">
      <div className="modal-box backdrop-blur-xl bg-base-100/80">
        <h3 className="font-bold text-lg mb-4">Edit status</h3>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Update status..."
        />

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost">Cancel</button>
          <button
            className="btn btn-primary"
            onClick={() => editData(item.id, value)}
          >
            Save
          </button>
          </form>

        </div>
      </div>
    </dialog>
  );
}
