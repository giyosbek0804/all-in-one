"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";

export default function DatePicker() {
  // const [date1, setDate1] = useState<Date | undefined>();
  // console.log(date1);
  return (
    <>
      {/* <button
        popoverTarget="rdp-popover1"
        className="input input-border"
        style={{ anchorName: "--rdp" } as React.CSSProperties}
      >
        {date1 ? date1.toLocaleDateString() : "Pick a date"}
      </button>
      <div
        popover="auto"
        id="rdp-popove1r"
        className="dropdown "
        style={{ positionAnchor: "--rdp" } as React.CSSProperties}
      >
        <DayPicker
          className="react-day-picker bg-base-200/55 backdrop-blur-lg font-primary   rounded-xl shadow-lg  "
          mode="single"
          selected={date1}
          onSelect={setDate1}
          modifiersClassNames={{
            selected: "bg-primary/50 rounded-xl   ",
            today: "bg-secondary   rounded-xl font-secondary  ",
          }}
        />
      </div> */}
    </>
  );
}
