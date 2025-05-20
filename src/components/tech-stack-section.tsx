"use client";

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

export function TechStackSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const technologies = [
    { name: "React", level: 90, color: "#61DAFB" },
    { name: "Next.js", level: 85, color: "#000000" },
    { name: "TypeScript", level: 85, color: "#3178C6" },
    { name: "Node.js", level: 80, color: "#339933" },
    { name: "Tailwind CSS", level: 90, color: "#38B2AC" },
    { name: "MongoDB", level: 75, color: "#47A248" },
    // Add more technologies
  ];
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Include technologies in the dependency array

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGraph = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 3;

      ctx.clearRect(0, 0, width, height);

      // Draw spider web
      const levels = 5;
      for (let i = 1; i <= levels; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${i / (levels * 2)})`;
        ctx.lineWidth = 1;
        
        for (let j = 0; j < technologies.length; j++) {
          const angle = (j / technologies.length) * Math.PI * 2 - Math.PI / 2;
          const r = (radius * i) / levels;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();
        ctx.stroke();
      }

      // Draw data
      ctx.beginPath();
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.lineWidth = 2;

      technologies.forEach((tech, i) => {
        const angle = (i / technologies.length) * Math.PI * 2 - Math.PI / 2;
        const r = (radius * tech.level) / 100;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw labels
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.font = '14px Inter';

      technologies.forEach((tech, i) => {
        const angle = (i / technologies.length) * Math.PI * 2 - Math.PI / 2;
        const r = radius + 30;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;

        ctx.fillText(tech.name, x, y);
      });
    };

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      drawGraph();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <section className="py-20 relative bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
        >
          Technical Skills
        </motion.h2>

        <div className="relative h-[600px] w-full">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
