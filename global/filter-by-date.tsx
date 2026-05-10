"use client";
import { useGlobalStore } from "./zustandStore";
import { DayPicker } from "react-day-picker";

export default function DatePicker() {
  const { filterDate, setFilterDate } = useGlobalStore();

  return (
    <div className="flex items-center gap-2">
      <button
        popoverTarget="global-filter-popover"
        className={`btn btn-sm rounded-xl gap-3 font-bold transition-all shadow-md group ${
          filterDate ? "btn-primary scale-105 px-4" : "btn-outline border-base-content/10 bg-base-100 hover:bg-base-200"
        }`}
        style={{ anchorName: "--filter-anchor" } as React.CSSProperties}
      >
        <span className={`text-xl transition-transform group-hover:rotate-12 ${filterDate ? "text-primary-content" : "text-primary"}`}>
          {filterDate ? "📅" : "🗓️"}
        </span>
        <span className="text-xs uppercase tracking-widest">{filterDate ? filterDate.toLocaleDateString() : "Filter"}</span>
      </button>

      {filterDate && (
        <button 
          onClick={() => setFilterDate(undefined)}
          className="btn btn-circle btn-xs btn-ghost text-error transition-all hover:bg-error/10"
          title="Clear date filter"
        >
          ✕
        </button>
      )}

      <div
        popover="auto"
        id="global-filter-popover"
        className="dropdown p-0 border-none bg-transparent"
        style={{ positionAnchor: "--filter-anchor" } as React.CSSProperties}
      >
        <div className="bg-base-100 p-4 rounded-3xl shadow-2xl border border-base-content/10 backdrop-blur-2xl mt-2">
          <DayPicker
            mode="single"
            selected={filterDate}
            onSelect={setFilterDate}
            className="react-day-picker font-primary"
            modifiersClassNames={{
              selected: "bg-primary text-primary-content rounded-xl font-bold",
              today: "text-primary font-black underline underline-offset-8"
            }}
          />
        </div>
      </div>
    </div>
  );
}
