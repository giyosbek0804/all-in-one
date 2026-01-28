"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
const themes = [
  "light","dark","cupcake","bumblebee","emerald","corporate",
  "synthwave","retro","cyberpunk","valentine","halloween",
  "garden","forest","aqua","lofi","pastel","fantasy",
  "wireframe","black","luxury","dracula","cmyk","autumn",
  "business","acid","lemonade","night","coffee","winter",
  "dim","nord","sunset",
];

export default function ThemeSwitcherFAB() {
   const { theme, setTheme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      {/* FAB */}
      <div className="fab fab-bottom  fab-end gap-3 z-100">
       <div
  tabIndex={0}
  role="button"
  className="btn btn-circle btn-lg
    bg-primary/80 backdrop-blur-xl
    shadow-xl shadow-primary/30
    transition-transform duration-300
    hover:scale-105
    focus-within:rotate-45 "
>
  🎨
</div>
      <div className="flex flex-col-reverse bg-primary/5 rounded p-[calc(.1rem+.1vw)] backdrop-blur-sm items-stretch gap-2 w-32">
  <button
    onClick={() =>
      (document.getElementById("theme-modal") as HTMLDialogElement)?.showModal()
    }
    className="btn btn-sm btn-ghost w-full justify-between"
  >
    <span className="fab-label">Themes</span>
    🖌️
  </button>

  <button
    onClick={() => setTheme("light")}
    className={`btn btn-sm w-full justify-between transition-all ${
      currentTheme === "light" ? "btn-primary scale-105" : "btn-ghost"
    }`}
  >
    <span className="fab-label">Light</span>
    🌞
  </button>

  <button
    onClick={() => setTheme("dark")}
    className={`btn btn-sm w-full justify-between transition-all ${
      currentTheme === "dark" ? "btn-primary scale-105" : "btn-ghost"
    }`}
  >
    <span className="fab-label">Dark</span>
    🌙
  </button>
</div>

      </div>

      {/* MODAL */}
      <dialog id="theme-modal" className="modal">
        <div className="modal-box max-w-3xl bg-primary/5  backdrop-blur-xl">
          <h3 className="font-bold text-lg mb-4">Choose a Theme</h3>

          {/* Theme Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 py-6 px-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
            {themes.map((t) => (
           <button
  key={t}
  onClick={() => setTheme(t)}
  className={`group relative rounded-2xl   p-4 transition-all duration-300
    bg-base-100/35 backdrop-blur-2xl
    border border-base-content/10
    hover:bg-base-100/55 hover:-translate-y-1
    hover:shadow-2xl hover:shadow-primary/20
    ${
      theme === t
        ? "ring-2 ring-primary ring-offset-2 ring-offset-base-200 shadow-primary/30"
        : ""
    }`}
>
  {/* GLASS HIGHLIGHT LAYER */}
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 rounded-2xl
      bg-linear-to-br from-white/20 via-white/5 to-transparent
      opacity-0 group-hover:opacity-100 transition-opacity"
  />

  {/* THEME PREVIEW */}
  <div
    data-theme={t}
    className="relative w-[calc(3rem+3vw)] z-10 flex gap-1  rounded-xl p-2
      bg-base-100/80 shadow-sm"
  >
    <span className="w-1/4 h-[calc(.8rem+.7vw)] rounded-full bg-primary" />
    <span className="w-1/4 h-auto rounded-full bg-secondary" />
    <span className="w-1/4 h-auto rounded-full bg-accent" />
    <span className="w-1/4 h-auto rounded-full bg-neutral" />
  </div>

  {/* THEME NAME */}
  <span className="relative z-10 capitalize text-sm font-semibold tracking-wide">
    {t}
  </span>
</button>
            ))}
          </div>
            

          <div className="modal-action">
            
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
