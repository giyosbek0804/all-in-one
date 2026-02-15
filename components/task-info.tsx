// TaskInfo.tsx
interface TaskInfoProps {
  item: any;
}

const TaskInfo = ({ item }: TaskInfoProps) => {
  if (!item) return null;

  // SAFE DATE HELPER
  const getJsDate = (dateVal: any) => {
    if (!dateVal) return null;
    // If it's a Firestore Timestamp, use .toDate()
    if (dateVal.toDate) return dateVal.toDate();
    // If it's already a Date object or a valid string/number
    const d = new Date(dateVal);
    return isNaN(d.getTime()) ? null : d;
  };

  const deadlineDate = getJsDate(item.deadline);
  const createdDate = getJsDate(item.createdAt);
  const isOverdue = deadlineDate ? deadlineDate < new Date() : false;

  return (
    <div className="flex items-center gap-3 mt-2 flex-wrap font-secondary">
      {/* Timestamp */}
      <p className="text-[.9rem] uppercase tracking-[0.2em] opacity-60">
        {createdDate ? createdDate.toLocaleDateString() : "Just now"}
      </p>


      {item.edited && (
        <span className="text-[9px] px-2 py-0.5 rounded-btn bg-base-content/5 border border-base-content/10 uppercase tracking-widest opacity-70">
          ✏️ Edited
        </span>
      )}


      {deadlineDate && (
        <span
          className={`text-[0.8rem] px-2 py-0.5 rounded-btn font-bold uppercase tracking-widest border ${
            isOverdue
              ? "bg-error/10 text-error border-error/20"
              : "bg-info/10 text-info border-info/20"
          }`}
        >
          {isOverdue ? "⚠️ Overdue" : `📅 ${deadlineDate.toLocaleDateString()}`}
        </span>
      )}
    </div>
  );
};

export default TaskInfo;
