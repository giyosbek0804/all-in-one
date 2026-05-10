"use client";
import { useEffect } from "react";
import { useGlobalStore } from "@/global/zustandStore";

export default function Notifications() {
  const { notifications, checkNotifications, tasks, removeNotification, clearNotifications } = useGlobalStore();

  useEffect(() => {
    // Initial check
    checkNotifications();
  }, [tasks, checkNotifications]);

  const hasNotifications = notifications.length > 0;

  return (
    <div className="dropdown dropdown-end">
      <button 
        tabIndex={0} 
        className="btn btn-ghost btn-circle relative transition-all duration-300 hover:bg-base-content/10 group"
      >
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-all ${hasNotifications ? "text-primary opacity-100" : "opacity-40"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {hasNotifications && (
            <span className="badge badge-primary badge-sm indicator-item font-black border-none scale-90">
              {notifications.length}
            </span>
          )}
        </div>
      </button>
      
      <div
        tabIndex={0}
        className="dropdown-content z-[9999] card card-compact bg-base-100/95 backdrop-blur-3xl w-80 sm:w-96 shadow-2xl border border-base-content/10 mt-4 rounded-[2rem] overflow-hidden"
      >

        <div className="card-body p-0">
          <div className="p-6 pb-4 flex justify-between items-center">
            <h3 className="font-black text-2xl tracking-tight">
              Alerts
            </h3>
            {hasNotifications && (
              <button 
                onClick={clearNotifications}
                className="btn btn-ghost btn-xs text-error font-bold hover:bg-error/10 rounded-lg"
              >
                Clear all
              </button>
            )}
          </div>
          
          <div className="px-2 pb-6 max-h-[400px] overflow-y-auto space-y-2 custom-scrollbar">
            {!hasNotifications ? (
              <div className="text-center py-12 space-y-4">
                <div className="text-5xl opacity-20">📭</div>
                <div className="space-y-1">
                  <p className="font-black text-lg opacity-60 text-balance">You have no notifications</p>
                  <p className="text-xs opacity-40">Your schedule is looking clear!</p>
                </div>
              </div>
            ) : (
              notifications.map((note) => (
                <div 
                  key={note.id} 
                  className={`group/note relative p-4 rounded-3xl flex flex-col gap-2 transition-all ${
                    note.type === "missed" 
                      ? "bg-error/5 hover:bg-error/10 border border-error/5" 
                      : "bg-warning/5 hover:bg-warning/10 border border-warning/5"
                  }`}
                >
                  <button 
                    onClick={() => removeNotification(note.id)}
                    className="absolute right-3 top-3 btn btn-circle btn-xs btn-ghost opacity-0 group-hover/note:opacity-100 transition-all"
                  >
                    ✕
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      note.type === "missed" ? "bg-error animate-pulse" : "bg-warning"
                    }`}></span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                      note.type === "missed" ? "text-error" : "text-warning"
                    }`}>
                      {note.type === "missed" ? "Deadline Missed" : "Approaching"}
                    </span>
                  </div>
                  
                  <p className="text-sm font-bold opacity-80 leading-snug pr-6">{note.message}</p>
                  
                  <span className="text-[10px] opacity-30 font-medium">
                    {note.timestamp.toLocaleDateString()} at {note.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
          </div>

          {hasNotifications && (
            <div className="bg-base-200/50 p-3 text-center border-t border-base-content/5">
              <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">
                Keep up the great work!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

