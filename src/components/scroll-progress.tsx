"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform-origin-0 z-50"
        style={{ scaleX }}
      />
      <motion.div 
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-800 flex items-center justify-center text-white font-semibold z-50"
        style={{ 
          rotate: scrollYProgress.get() * 360 
        }}
      >
        <motion.div
          style={{
            rotate: -1 * (scrollYProgress.get() * 360)
          }}
        >
          {Math.round(scrollYProgress.get() * 100)}%
        </motion.div>
      </motion.div>
    </>
  );
}
