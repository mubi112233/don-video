"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { colorSchemes, currentTheme } from "@/lib/theme-config";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const switchTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Reload to apply new CSS variables
    window.location.reload();
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-card border border-border rounded-lg p-2 shadow-lg">
      <div className="flex gap-2">
        {Object.entries(colorSchemes).map(([key, scheme]) => (
          <Button
            key={key}
            variant={theme === key ? "default" : "outline"}
            size="sm"
            onClick={() => switchTheme(key)}
            className="flex items-center gap-2"
            title={`Switch to ${scheme.name} theme`}
          >
            <div 
              className="w-4 h-4 rounded-full border-2 border-border"
              style={{ backgroundColor: `hsl(${scheme.colors.primary})` }}
            />
            <span className="text-xs">{scheme.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
