"use client";
import React, { useState } from "react";
import { useGlobalStore } from "./zustandStore";
import { DayPicker } from "react-day-picker";
export const AddData = () => {
  const [date, setDate] = useState<Date | undefined>();
  // 1. Get everything from the store
  // const addData = useGlobalStore((state) => state.addData);
const { addData, loading, filterDate, setFilterDate } = useGlobalStore();

  const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !inputValue.trim()) return;

    try {
      // 2. Just call the store function! No need for Firebase imports here.
      await addData(inputValue,  filterDate);
      setInputValue("");
      setDate(undefined);
      console.log("Success: Store updated everything");
    } catch (e) {
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        required
        placeholder="Type status..."
        className="input input-bordered w-full text-[clamp(.8rem,2vw,1rem)]"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button
        type="button"
        popoverTarget="rdp-popover"
        className="input input-bordered flex items-center"
        style={{ anchorName: "--rdp" } as React.CSSProperties}
      >
        {filterDate ? filterDate.toLocaleDateString() : "View/Set Deadline"}
      </button>

      <div
        popover="auto"
        id="rdp-popover"
        className="dropdown "
        style={{ positionAnchor: "--rdp" } as React.CSSProperties}
      >
        <DayPicker
          className="react-day-picker bg-base-200/55 backdrop-blur-lg font-primary   rounded-xl shadow-lg  "
          mode="single"
          selected={filterDate}
          onSelect={setFilterDate}
          disabled={{ before: new Date() }}
          modifiersClassNames={{
            selected: "bg-primary/50 rounded-xl   ",
            today: "bg-secondary   rounded-xl font-secondary  ",
          }}
        />
      </div>
    </form>
  );
};
