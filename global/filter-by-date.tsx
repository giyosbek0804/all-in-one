"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";

export default function DatePicker() {
  const [date, setDate] = useState<Date | undefined>();
  console.log(date);
  return (
    <>
      <button
        popoverTarget="rdp-popover"
        className="input input-border"
        style={{ anchorName: "--rdp" } as React.CSSProperties}
      >
        {date ? date.toLocaleDateString() : "Pick a date"}
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
          selected={date}
          onSelect={setDate}
          modifiersClassNames={{
            selected: "bg-primary/50 rounded-xl   ",
            today: "bg-secondary   rounded-xl font-secondary  ",
          }}
        />
        
      </div>
    </>
  );
}
