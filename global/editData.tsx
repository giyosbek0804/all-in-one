"use client";

import { useState } from "react";
import { useGlobalStore } from "./zustandStore";

export function EditModal({ item }: { item: any }) {
  const [value, setValue] = useState(item.status);
  const editData = useGlobalStore((s) => s.editData);

  return (
    <dialog id={`edit-${item.id}`} className="modal">
      <div className="modal-box bg-base-100/80 backdrop-blur-xl">
        <h3 className="font-bold text-lg mb-4">Edit status</h3>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input input-bordered text-wrap w-full min-h-30 resize-none "
        />

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost">Cancel</button>
          </form>

          <button
            className="btn btn-primary"
            onClick={async () => {
              await editData(item.id, value);
              (
                document.getElementById(
                  `edit-${item.id}`
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
