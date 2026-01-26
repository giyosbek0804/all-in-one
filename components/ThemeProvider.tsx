"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      defaultTheme="system" 
      enableSystem 
      attribute="data-theme" // This is key! It tells DaisyUI which theme to use
    >
      {children}
    </NextThemesProvider>
  );
}