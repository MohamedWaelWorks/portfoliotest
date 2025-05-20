"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  status: "upcoming" | "in-progress" | "completed";
  demo?: string;
  github?: string;
}

const allProjects: Project[] = [
  {
    id: 1,
    title: "Custom Web Applications",
    description: "Professional web applications built with modern technologies like Next.js, React, and Node.js. From simple websites to complex enterprise solutions.",
    image: "/1st.png",
    tags: ["Web Development", "Full Stack"],
    status: "upcoming",
  },
  {
    id: 2,
    title: "E-commerce Solutions",
    description: "Complete e-commerce platforms with secure payment integration, inventory management, and seamless user experience.",
    image: "/2nd.png",
    tags: ["E-commerce", "Web Development"],
    status: "upcoming",
  },
  {
    id: 3,
    title: "Cybersecurity Services",
    description: "Comprehensive security solutions including penetration testing, security audits, and custom security implementations.",
    image: "/placeholder-project.png",
    tags: ["Cybersecurity", "Consulting"],
    status: "upcoming",
  },
  {
    id: 4,
    title: "UI/UX Design Services",
    description: "Professional design services including branding, user interface design, and complete design systems.",
    image: "/placeholder-project.png",
    tags: ["Design", "UI/UX"],
    status: "upcoming",
  },
];

export function ProjectsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-[#0f1116] to-[#1a1a1a]"
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
              My Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Welcome to my project showcase. Each project represents an opportunity to explore and innovate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: project.id * 0.2 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-gray-900/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
              whileHover={{
                translateY: -5,
                rotateX: 2,
                rotateY: 2,
                transition: { duration: 0.4 },
              }}
            >
              <motion.div
                className="relative h-48 overflow-hidden"
                animate={{
                  scale: hoveredId === project.id ? 1.05 : 1,
                }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                  priority={project.id === 1} // Prioritize loading the first project image
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />
              </motion.div>

              <motion.div 
                className="p-6 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h3 
                  className="text-xl font-bold text-white mb-2"
                  animate={{
                    color: hoveredId === project.id ? "#3b82f6" : "#ffffff",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {project.title}
                </motion.h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className="text-sm px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(59, 130, 246, 0.2)",
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ transform: "translateZ(-10px)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
