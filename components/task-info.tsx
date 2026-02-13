// TaskInfo.tsx
interface TaskInfoProps {
  item: any; // Ideally, use your Task type here
}

const TaskInfo = ({ item }: TaskInfoProps) => {
  if (!item) return null;

  return (
    <div className="flex items-center gap-3 mt-2 flex-wrap font-secondary">
      {/* Timestamp - Using the "Soft Stencil" style */}
      <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">
        {item.createdAt?.toDate?.().toLocaleDateString() ?? "Just now"}
      </p>

      {/* Show edited badge */}
      {item.edited && (
        <span className="text-[9px] px-2 py-0.5 rounded-btn bg-base-content/5 border border-base-content/10 uppercase tracking-widest opacity-70">
          Edited
        </span>
      )}

      {/* Show deadline if exists */}
      {item.deadline && (
        <span
          className={`text-[9px] px-2 py-0.5 rounded-btn font-bold uppercase tracking-widest ${
            new Date(item.deadline) < new Date()
              ? "bg-error/10 text-error border border-error/20"
              : "bg-info/10 text-info border border-info/20"
          }`}
        >
          {new Date(item.deadline) < new Date()
            ? "⚠️ Overdue"
            : `📅 ${new Date(item.deadline).toLocaleDateString()}`}
        </span>
      )}
    </div>
  );
};

export default TaskInfo;
