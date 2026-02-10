"use client";

import { useEffect } from "react";
import { useGlobalStore } from "./zustandStore";
import { EditModal } from "./editData";
import toast from "react-hot-toast";

const FetchData = () => {
  const { tasks, fetchData, loading, deleteItem, editData } = useGlobalStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading && tasks.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <ul className="mt-8 space-y-3">
      {tasks.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-6xl mb-4 opacity-20">📝</div>
          <p className="text-lg font-semibold opacity-60 mb-2">No tasks yet</p>
          <p className="text-sm opacity-40">
            Create your first task to get started
          </p>
        </div>
      ) : (
        tasks.map((item, index) => (
          <li
            key={item.taskId}
            style={{ animationDelay: `${index * 50}ms` }}
            className={`group relative focus-within:z-50 flex justify-between items-center p-5 rounded-xl bg-linear-to-br transition-all duration-300 animate-fade-in ${
              item.status === "completed"
                ? "from-base-100/40 to-base-100/20 border border-base-content/5"
                : "from-base-100/80 to-base-100/60 border border-base-content/10 shadow-lg hover:shadow-xl hover:scale-[1.01]"
            } backdrop-blur-xl`}
          >
            {/* Priority indicator */}
            {item.priority && (
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
                  item.priority === "urgent"
                    ? "bg-error animate-pulse"
                    : item.priority === "high"
                    ? "bg-error"
                    : item.priority === "medium"
                    ? "bg-warning"
                    : "bg-info"
                }`}
              ></div>
            )}

            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Animated Checkbox */}
              <div className="relative">
                <input
                  type="checkbox"
                  checked={item.status === "completed"}
                  onChange={() =>
                    editData(item.taskId, {
                      status:
                        item.status === "completed" ? "active" : "completed",
                    })
                  }
                  className="checkbox checkbox-success transition-all duration-200 hover:scale-110 cursor-pointer"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="relative inline-block max-w-full">
                  <p
                    className={`font-semibold text-base first-letter:uppercase transition-all duration-300 ${
                      item.status === "completed"
                        ? "opacity-40 line-through"
                        : "opacity-100"
                    }`}
                    title={item.title} // Tooltip shows full title
                  >
                    {item.title}
                  </p>
                </div>

                {/* Enhanced timestamp and description */}
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <p className="text-xs opacity-60">
                    {item.createdAt?.toDate?.().toLocaleString() ?? "Just now"}
                  </p>

                  {/* Show edited badge */}
                  {item.edited && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-base-content/10">
                      ✏️ Edited
                    </span>
                  )}

                  {/* Show deadline if exists */}
                  {item.deadline && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        new Date(item.deadline) < new Date()
                          ? "bg-error/20 text-error"
                          : "bg-info/20 text-info"
                      }`}
                    >
                      {new Date(item.deadline) < new Date()
                        ? "⚠️ Overdue"
                        : `📅 ${new Date(item.deadline).toLocaleDateString()}`}
                    </span>
                  )}
                </div>

                {/* Description preview */}
                {item.description && item.description !== "testing" && (
                  <p className="text-xs opacity-50 mt-1 line-clamp-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            {/* Actions Menu with improved interactions */}
            <div className="dropdown z-50 relative  dropdown-end">
              <button
                tabIndex={0}
                aria-label="Task actions"
                className={`btn btn-circle btn-sm transition-all duration-200 hover:rotate-90 ${
                  item.status === "completed"
                    ? "btn-ghost opacity-40"
                    : "btn-ghost hover:btn-primary opacity-60 group-hover:opacity-100"
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

              {/* kebab menu */}
              <ul
                tabIndex={0}
                className="dropdown-content  border absolute top-0 right-0 menu p-2 shadow-2xl bg-base-100 rounded-box w-48 mt-2  border-base-content/10 z-100"
              >
                <li className="">
                  <button
                    onClick={() => {
                      (
                        document.getElementById(
                          `edit-${item.taskId}`
                        ) as HTMLDialogElement
                      )?.showModal();
                    }}
                    disabled={item.status === "completed"}
                    className="flex items-center gap-3 hover:bg-primary/10 active:scale-95 transition-transform"
                  >
                    <span className="text-lg">✏️</span>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Edit</span>
                      <span className="text-xs opacity-60">Modify task</span>
                    </div>
                  </button>
                </li>

                {/* Status actions */}
                {item.status === "completed" && (
                  <li>
                    <button
                      onClick={() =>
                        editData(item.taskId, { status: "active" })
                      }
                      className="flex items-center gap-3 hover:bg-warning/10 active:scale-95 transition-transform"
                    >
                      <span className="text-lg">↩️</span>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Reactivate</span>
                        <span className="text-xs opacity-60">
                          Mark as active
                        </span>
                      </div>
                    </button>
                  </li>
                )}

                {item.status === "active" && (
                  <li>
                    <button
                      onClick={() =>
                        editData(item.taskId, { status: "snoozed" })
                      }
                      className="flex items-center gap-3 hover:bg-warning/10 active:scale-95 transition-transform"
                    >
                      <span className="text-lg">💤</span>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Snooze</span>
                        <span className="text-xs opacity-60">Pause task</span>
                      </div>
                    </button>
                  </li>
                )}

                <li>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${item.title}\n${item.description}\nPriority: ${item.priority}`
                      );
                      toast.success("Copied to clipboard!");
                    }}
                    className="flex items-center gap-3 hover:bg-success/10 active:scale-95 transition-transform"
                  >
                    <span className="text-lg">📤</span>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Share</span>
                      <span className="text-xs opacity-60">
                        Copy to clipboard
                      </span>
                    </div>
                  </button>
                </li>

                <div className="divider my-1"></div>

                {/* Archive option */}
                <li>
                  <button
                    onClick={() =>
                      editData(item.taskId, { status: "archived" })
                    }
                    className="flex items-center gap-3 hover:bg-base-content/10 active:scale-95 transition-transform"
                  >
                    <span className="text-lg">📦</span>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Archive</span>
                      <span className="text-xs opacity-60">
                        Move to archive
                      </span>
                    </div>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this task?")
                      ) {
                        deleteItem(item.taskId, "user");
                      }
                    }}
                    className="flex items-center gap-3 hover:bg-error/10 text-error active:scale-95 transition-transform"
                  >
                    <span className="text-lg">🗑️</span>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Delete</span>
                      <span className="text-xs opacity-60">Remove forever</span>
                    </div>
                  </button>
                </li>
              </ul>
            </div>

            <EditModal item={item} />
          </li>
        ))
      )}
    </ul>
  );
};

export default FetchData;
