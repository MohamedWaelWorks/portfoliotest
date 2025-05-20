"use client";

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface ExperienceCardProps {
  title: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
  logoUrl?: string;
}

export function ExperienceSection() {
  const experiences: ExperienceCardProps[] = [
    {
      title: "Full Stack Developer",
      company: "Your Current Company",
      duration: "2023 - Present",
      description: "Led development of modern web applications using Next.js, React, and TypeScript. Implemented responsive designs and optimized performance.",
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
      logoUrl: "/company-logo.svg"
    },
    // Add more experiences here
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
        >
          Experience
        </motion.h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
          
          {/* Experience cards */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <ExperienceCard 
                key={index}
                {...exp}
                alignment={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ 
  title, 
  company, 
  duration, 
  description, 
  skills, 
  logoUrl, 
  alignment 
}: ExperienceCardProps & { alignment: "left" | "right" }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const variants = {
    hidden: {
      opacity: 0,
      x: alignment === "left" ? -50 : 50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`flex justify-${alignment === "left" ? "start" : "end"} w-full`}>
      <motion.div
        ref={cardRef}
        variants={variants}
        initial="hidden"
        animate={controls}
        className={`w-[calc(50%-2rem)] p-6 bg-neutral-900/50 backdrop-blur-md rounded-xl border border-neutral-800 hover:border-blue-500/50 transition-all duration-500 ${
          alignment === "left" ? "mr-8" : "ml-8"
        }`}
      >
        <div className="flex items-start gap-4 mb-4">
          {logoUrl && (
            <img 
              src={logoUrl} 
              alt={company} 
              className="w-12 h-12 rounded-full bg-neutral-800 p-2"
            />
          )}
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-neutral-400">{company}</p>
            <p className="text-sm text-neutral-500">{duration}</p>
          </div>
        </div>
        
        <p className="text-neutral-300 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
