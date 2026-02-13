import { useGlobalStore } from "@/global/zustandStore";
interface KebabMenuProps {
  item: any;
}
import toast from "react-hot-toast";
const KebabMenu = ({ item }: KebabMenuProps) => {
  const { tasks, deleteItem, editData } = useGlobalStore();
  return (
    <>
      <ul
        tabIndex={0}
        className="dropdown-content  border absolute top-0 right-0 menu p-2 shadow-accent bg-base-100 rounded-box w-48 mt-2  border-base-content/10 z-100"
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
              onClick={() => editData(item.taskId, { status: "active" })}
              className="flex items-center gap-3 hover:bg-warning/10 active:scale-95 transition-transform"
            >
              <span className="text-lg">↩️</span>
              <div className="flex flex-col items-start">
                <span className="font-medium">Reactivate</span>
                <span className="text-xs opacity-60">Mark as active</span>
              </div>
            </button>
          </li>
        )}

        {item.status === "active" && (
          <li>
            <button
              onClick={() => editData(item.taskId, { status: "snoozed" })}
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
              <span className="text-xs opacity-60">Copy to clipboard</span>
            </div>
          </button>
        </li>

        <div className="divider my-1"></div>

        {/* Archive option */}
        <li>
          <button
            onClick={() => editData(item.taskId, { status: "archived" })}
            className="flex items-center gap-3 hover:bg-base-content/10 active:scale-95 transition-transform"
          >
            <span className="text-lg">📦</span>
            <div className="flex flex-col items-start">
              <span className="font-medium">Archive</span>
              <span className="text-xs opacity-60">Move to archive</span>
            </div>
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this task?")) {
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
    </>
  );
};

export default KebabMenu;
