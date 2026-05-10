"use client";
import ThemeSwitcher from "@/components/ThemeSwitcher";

import { AddData } from "@/global/addData";
import FetchData from "@/global/fetchData";
import { Toaster } from "react-hot-toast";
import DatePicker from "@/global/filter-by-date";
import Auth from "@/components/Auth";
import { useGlobalStore } from "@/global/zustandStore";
import Notifications from "@/components/Notifications";

/**
 * Home page that will eventually direct to either finance or tasks. 
 * For now, it defaults to showing tasks on entrance.
 */
export default function Home() {
  const { user, filterStatus, setFilterStatus, tasks } = useGlobalStore();

  const getCount = (status: string) => tasks.filter(t => t.status === status).length;

  return (
    <div className="min-h-screen p-4 sm:p-10 bg-base-100 text-base-content font-primary">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="relative flex justify-center items-center py-4 z-50">

          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <Notifications />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-5xl font-black tracking-tighter text-primary drop-shadow-sm">
              All-In-One
            </h1>
            <p className="opacity-40 text-[10px] font-black uppercase tracking-[0.3em]">Elegant Productivity</p>
          </div>
        </header>



        <Auth />

        {user ? (
          <main className="space-y-8 animate-fade-in">
            <section className="card bg-base-200/50 backdrop-blur-md border border-base-content/5 shadow-2xl p-2 sm:p-6">
              <AddData />
            </section>
            
            <section className="space-y-6">
              <div className="tabs tabs-box bg-base-200/30 p-1 rounded-2xl flex flex-wrap sm:flex-nowrap gap-1">
                {[
                  { id: "active", label: "Active", emoji: "🔥" },
                  { id: "snoozed", label: "Snoozed", emoji: "💤" },
                  { id: "archived", label: "Archived", emoji: "📦" },
                  { id: "all", label: "All", emoji: "🌈" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterStatus(tab.id as any)}
                    className={`tab flex-1 gap-2 h-12 rounded-xl transition-all duration-300 font-bold ${
                      filterStatus === tab.id 
                        ? "tab-active bg-primary text-primary-content shadow-lg scale-[1.02]" 
                        : "hover:bg-base-content/5"
                    }`}
                  >
                    <span>{tab.emoji}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="badge badge-sm opacity-50 bg-base-300 border-none">
                      {tab.id === "all" ? tasks.length : getCount(tab.id)}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
                   <h2 className="text-3xl font-black capitalize tracking-tight">{filterStatus} Tasks</h2>
                   <DatePicker />
                </div>
                <div className="bg-base-200/30 rounded-3xl p-2 sm:p-4 min-h-[400px]">
                  <FetchData />
                </div>
              </div>
            </section>

          </main>
        ) : (
          <div className="text-center py-32 space-y-6">
            <div className="text-8xl animate-bounce">👋</div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Ready to be productive?</h2>
              <p className="opacity-60 max-w-xs mx-auto text-balance">Sign in to sync your tasks across all your devices securely.</p>
            </div>
          </div>
        )}


        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            className: "!bg-base-200 !text-base-content !border !border-base-content/10 !shadow-2xl !rounded-2xl !px-6 !py-4 !backdrop-blur-xl",
            success: {
              iconTheme: {
                primary: "var(--color-primary)",
                secondary: "white",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--color-error)",
                secondary: "white",
              },
            },
          }}
        />

        
        <div className="divider mt-20">Settings</div>
        <div className="flex justify-center">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}


