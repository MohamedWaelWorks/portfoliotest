"use client";

import { motion, useInView } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";

const letterVariants = {
  initial: {
    y: 100,
    opacity: 0,
    rotateX: -90,
    scale: 0,
  },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.05,
      type: "spring",
      stiffness: 200,
      damping: 12,
    },
  }),
  hover: {
    scale: 1.2,
    rotateY: 180,
    color: "hsl(var(--primary))",
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 300,
      damping: 8,
    },
  },
};

const glowVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export function HeroSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const name = "Mohamed Wael".split("");

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-neutral-900 to-accent-900"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        variants={glowVariants}
        initial="initial"
        animate="animate"
        style={{
          background:
            "radial-gradient(circle at center, rgba(14,165,233,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-sky-400">
            Hello, I&apos;m
          </h2>
        </motion.div>

        {/* Animated name */}
        <div className="flex flex-wrap justify-center gap-[0.2em] my-4 select-none">
          {name.map((letter, i) => (
            <motion.span
              key={`${letter}-${i}`}
              variants={letterVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              whileHover="hover"
              custom={i}
              className="text-6xl sm:text-8xl font-bold cursor-default inline-block text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]"
              style={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        {/* Animated role text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8"
        >
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                2000,
                "UI/UX Designer",
                2000,
                "Web Developer",
                2000,
                "Software Engineer",
                2000,
              ]}
              wrapper="h2"
              speed={50}
              repeat={Infinity}
              className="bg-gradient-to-r from-blue-400 to-violet-500 inline-block text-transparent bg-clip-text"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Crafting beautiful and functional digital experiences with a passion
            for design and innovation.
          </motion.p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12"
        >
          <motion.button
            onClick={scrollToProjects}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(14,165,233,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-medium overflow-hidden"
          >
            <motion.span
              className="relative z-10 flex items-center gap-2"
              whileHover={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              View My Work
              <ArrowDown className="w-4 h-4 inline-block -rotate-90 group-hover:translate-x-1 transition-transform" />
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: [0.4, 1, 0.4],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute bottom-8 cursor-pointer"
        onClick={scrollToProjects}
      >
        <motion.div
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowDown className="w-6 h-6 text-primary-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}