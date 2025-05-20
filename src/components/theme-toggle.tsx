"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface ThemeOption {
  value: "light" | "dark" | "system";
  label: string;
  icon: typeof Sun | typeof Moon | typeof Monitor;
}

const themeOptions: ThemeOption[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <>
      {/* Backdrop blur when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div ref={menuRef} className="relative z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative inline-flex items-center justify-center rounded-lg
                    h-10 w-10 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm
                    hover:bg-neutral-100 dark:hover:bg-neutral-700
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400
                    shadow-lg shadow-black/5"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative w-5 h-5"
            >
              {theme === "light" && <Sun className="w-full h-full text-amber-500" />}
              {theme === "dark" && <Moon className="w-full h-full text-sky-400" />}
              {theme === "system" && <Monitor className="w-full h-full text-emerald-500" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-36 rounded-lg border border-neutral-200 dark:border-neutral-700
                       bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm shadow-xl py-2"
              style={{ transformOrigin: "top right" }}
            >
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isActive = theme === option.value;
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => {
                      setTheme(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-2 text-sm gap-2
                              ${isActive 
                                ? "text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10" 
                                : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                              }
                              transition-colors duration-200`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{option.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}