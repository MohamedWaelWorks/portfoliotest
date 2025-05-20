"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <motion.div
          className="w-full h-full bg-white rounded-full opacity-80"
          animate={{
            scale: isPointer ? 1.2 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-40 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.2,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-white opacity-30"
          animate={{
            scale: isPointer ? 1.4 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
