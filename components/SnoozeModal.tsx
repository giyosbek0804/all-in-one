"use client";
import { useState } from "react";
import { useGlobalStore } from "@/global/zustandStore";
import { DayPicker } from "react-day-picker";
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";

export default function SnoozeModal({ item }: { item: any }) {
  const [date, setDate] = useState<Date | undefined>();
  const editData = useGlobalStore((s) => s.editData);

  const handleSnooze = async () => {
    if (!date) {
      toast.error("Please select a date to snooze until");
      return;
    }

    try {
      await editData(item.taskId, { 
        status: "snoozed",
        deadline: Timestamp.fromDate(date)
      });
      
      toast.success(`Task snoozed until ${date.toLocaleDateString()}`);
      
      (document.getElementById(`snooze-${item.taskId}`) as HTMLDialogElement)?.close();
    } catch (error) {
      console.error(error);
      toast.error("Failed to snooze task");
    }
  };

  return (
    <dialog id={`snooze-${item.taskId}`} className="modal">
      <div className="modal-box max-w-sm bg-base-100/90 backdrop-blur-2xl border border-base-content/10 shadow-2xl">
        <h3 className="font-black text-xl mb-6 flex items-center gap-2">
          <span>💤</span> Snooze Task
        </h3>
        
        <p className="text-sm opacity-60 mb-4">Until when would you like to pause this task?</p>
        
        <div className="flex justify-center bg-base-200/50 rounded-2xl p-2 mb-6">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={{ before: new Date() }}
            className="react-day-picker font-primary"
            modifiersClassNames={{
              selected: "bg-primary text-primary-content rounded-lg font-bold",
              today: "text-primary font-black underline underline-offset-4"
            }}
          />
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost rounded-xl font-bold">Cancel</button>
          </form>
          <button
            onClick={handleSnooze}
            className="btn btn-primary rounded-xl font-bold shadow-lg shadow-primary/20"
          >
            Confirm Snooze
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
