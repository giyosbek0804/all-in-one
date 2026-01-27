"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", 
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", 
  "garden", "forest", "aqua", "lofi", "pastel", "fantasy", 
  "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", 
  "business", "acid", "lemonade", "night", "coffee", "winter", 
  "dim", "nord", "sunset"
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="dropdown dropdown-top dropdown-end fixed right-6 bottom-6">
      {/* The Button */}
      <div tabIndex={0} role="button" className="btn btn-outline border-2 gap-2 shadow-lg hover:scale-105 transition-transform">
        <span className="text-xs opacity-60 uppercase font-bold tracking-widest">Theme</span>
        <span className="capitalize">{theme}</span>
        <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
          <path d="M1799 346l128 128-896 896-896-896 128-128 768 768 768-768z"></path>
        </svg>
      </div>

      {/* The Dropdown Menu */}
      <ul tabIndex={0} className="dropdown-content z-100 p-2 shadow-2xl bg-base-200 rounded-box w-64 max-h-[70vh] overflow-y-auto border border-white/10 mt-2 grid grid-cols-1 gap-1">
        {themes.map((t) => (
          <li key={t}>
            <button
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors hover:bg-base-300 ${theme === t ? "bg-primary/20 ring-1 ring-primary" : ""}`}
              onClick={() => setTheme(t)}
            >
              <div className="flex items-center gap-3">
                {/* Visual Color Preview */}
                <div data-theme={t} className="flex gap-1 bg-base-100 p-1 rounded-md">
                   <div className="w-2 h-4 rounded-full bg-primary"></div>
                   <div className="w-2 h-4 rounded-full bg-secondary"></div>
                   <div className="w-2 h-4 rounded-full bg-accent"></div>
                   <div className="w-2 h-4 rounded-full bg-neutral"></div>
                </div>
                <span className={`text-sm capitalize ${theme === t ? "font-bold text-primary" : ""}`}>
                  {t}
                </span>
              </div>
              
              {/* Checkmark for active theme */}
              {theme === t && (
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}