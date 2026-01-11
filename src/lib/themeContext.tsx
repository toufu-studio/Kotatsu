"use client";

import { Theme } from "emoji-picker-react";
import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface BGThemeContext {
  themeColor: string;
  colorChange: (newColor: string) => void;
}

const ThemeContext = createContext<BGThemeContext | undefined>(undefined);

export function ChangeTheme({ children }: { children: ReactNode }) {
  const [themeColor, setThemeColor] = useState("rgb(249, 250, 251)");

  useEffect(() => {
    const savedThemeColor = localStorage.getItem("theme_color");
    if (savedThemeColor) {
      setThemeColor(savedThemeColor);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--secondbg", themeColor);
  }, [themeColor]);

  const colorChange = (newColor: string) => {
    setThemeColor(newColor);
    localStorage.setItem("theme_color", newColor);
  };

  return (
    <ThemeContext.Provider value={{ themeColor, colorChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useBGTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("Error");
  }
  return context;
};