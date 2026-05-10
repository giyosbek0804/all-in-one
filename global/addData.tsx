"use client";
import React, { useState } from "react";
import { useGlobalStore } from "./zustandStore";
import { DayPicker } from "react-day-picker";
import toast from "react-hot-toast";

export const AddData = () => {
  const [taskDate, setTaskDate] = useState<Date | undefined>();
  const [inputValue, setInputValue] = useState("");
  const { addData, loading } = useGlobalStore();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !inputValue.trim()) return;

    if (!taskDate) {
      toast.error("Please select a deadline!");
      return;
    }

    try {
      await addData(inputValue, taskDate);
      setInputValue("");
      setTaskDate(undefined);
    } catch (e) {
      toast.error("Failed to add task");
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="relative group">
        <input
          type="text"
          required
          placeholder="What needs to be done?"
          className="input input-lg bg-base-100 border-base-content/10 w-full pr-16 font-bold shadow-inner focus:border-primary transition-all rounded-2xl"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        
        <button
          type="button"
          popoverTarget="task-date-popover"
          className={`absolute right-4 top-1/2 -translate-y-1/2 btn btn-ghost btn-circle btn-sm transition-all duration-300 ${
            taskDate ? "text-primary scale-125" : "opacity-30 hover:opacity-100"
          }`}
          style={{ anchorName: "--task-date-anchor" } as React.CSSProperties}
        >
          <span className="text-xl leading-none">{taskDate ? "📅" : "🗓️"}</span>
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary btn-block h-12 rounded-2xl font-bold text-base shadow-lg shadow-primary/10 transition-all hover:scale-[1.01] active:scale-[0.98]"
      >

        {loading ? <span className="loading loading-spinner"></span> : "Add Task"}
      </button>

      {/* Date Picker Popover */}
      <div
        popover="auto"
        id="task-date-popover"
        className="dropdown p-0 border-none bg-transparent"
        style={{ positionAnchor: "--task-date-anchor" } as React.CSSProperties}
      >
        <div className="bg-base-100 p-4 rounded-3xl shadow-2xl border border-base-content/10 backdrop-blur-2xl">
          <DayPicker
            mode="single"
            selected={taskDate}
            onSelect={setTaskDate}
            disabled={{ before: new Date() }}
            className="react-day-picker font-primary"
            modifiersClassNames={{
              selected: "bg-primary text-primary-content rounded-xl font-bold",
              today: "text-primary font-black underline underline-offset-8"
            }}
          />
          {taskDate && (
            <div className="mt-4 p-3 bg-primary/10 rounded-xl text-center text-sm font-bold text-primary">
              Deadline: {taskDate.toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

