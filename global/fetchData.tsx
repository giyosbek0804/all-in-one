"use client";

import { useEffect } from "react";
import { useGlobalStore } from "./zustandStore";
import { EditModal } from "./editData";
import KebabMenu from "@/components/kebab-menu";
import TaskInfo from "@/components/task-info";
const FetchData = () => {
  const { tasks, fetchData, loading, editData, filterDate } = useGlobalStore();

const sortedTasks = [...tasks]
  .filter((task) => {
    if (!filterDate) return true; // Show all if no date selected
    if (!task.deadline) return false; // Hide tasks with no deadline if filtering

    // Compare dates (ignoring time)
    const taskDate = task.deadline.toDate();
    return (
      taskDate.getDate() === filterDate.getDate() &&
      taskDate.getMonth() === filterDate.getMonth() &&
      taskDate.getFullYear() === filterDate.getFullYear()
    );
  })
  .sort((a, b) => {
    const dateA = a.createdAt?.toDate?.()?.getTime() || 0;
    const dateB = b.createdAt?.toDate?.()?.getTime() || 0;
    return dateA - dateB;
  });

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
    <div className="flex flex-col">
      {filterDate && (
        <button
          onClick={() => useGlobalStore.getState().setFilterDate(undefined)}
          className="btn btn-xs btn-outline w-fit mb-2"
        >
          Clear Filter: {filterDate.toLocaleDateString()} ✕
        </button>
      )}
      <ul className="mt-8 space-y-3">
        {tasks.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-6xl mb-4 opacity-20">📝</div>
            <p className="text-lg font-semibold opacity-60 mb-2">
              No tasks yet
            </p>
            <p className="text-sm opacity-40">
              Create your first task to get started
            </p>
          </div>
        ) : (
          sortedTasks.map((item, index) => (
            <li
              key={item.taskId}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`group  relative focus-within:z-50 flex rounded-box justify-between items-center p-5  bg-linear-to-br transition-all duration-300 animate-fade-in ${
                item.status === "completed"
                  ? "from-base-100/40 to-base-100/20 border border-base-content/5"
                  : "from-base-100/80 to-base-100/60 border border-base-content/10 shadow-lg hover:shadow-xl hover:scale-[1.01]"
              } backdrop-blur-xl`}
            >
              {/* Priority indicator */}
              {item.priority && (
                <div
                  className={`absolute left-0 top-0 bottom-0 w-2 rounded-l-box ${
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
                  <TaskInfo item={item} />

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
                  className={`btn btn-circle btn-sm transition-all duration-200  ${
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
                <KebabMenu item={item} />
              </div>

              <EditModal item={item} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FetchData;
