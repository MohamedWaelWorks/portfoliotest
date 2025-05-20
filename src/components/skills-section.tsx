"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code, PenTool, Shield, MonitorSmartphone } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    techs: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Backend Development",
    techs: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    title: "Tools & Technologies",
    techs: [
      { name: "Git", level: 85 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Linux", level: 80 },
    ],
  },
];

export function SkillsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-16 lg:py-24 relative bg-gradient-to-b from-[#1a1a1a] to-[#0f1116]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A3FF] to-[#0066ff]">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and professional
            expertise.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-primary-500/50 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.techs.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -20 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: (categoryIndex * 0.2) + (index * 0.1),
                    }}
                    onMouseEnter={() => setHoveredSkill(tech.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="relative"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">{tech.name}</span>
                      <span className="text-primary-500">{tech.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                        initial={{ width: 0 }}
                        animate={
                          isInView ? { width: `${tech.level}%` } : { width: 0 }
                        }
                        transition={{
                          duration: 1,
                          delay: (categoryIndex * 0.2) + (index * 0.1),
                        }}
                        style={{
                          filter:
                            hoveredSkill === tech.name
                              ? "brightness(1.2)"
                              : "brightness(1)",
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}