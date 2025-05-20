"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [activeSection, setActiveSection] = useState("");

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Get all sections
      const sections = ["home", "projects", "skills", "contact"];

      // Find the current section
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the section is in view (with some buffer for better UX)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setStars(newStars);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  const handleLinkClick = (href: string) => {
    setActiveSection(href);
    setIsMobileMenuOpen(false);

    // Smooth scroll to section
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Star background */}
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute bg-primary-400/30 dark:bg-primary-300/30 rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
              }}
              animate={{
                opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link
              href="#home"
              onClick={() => handleLinkClick("#home")}
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500"
            >
              MW
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="px-3 py-2 text-sm font-medium rounded-md text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors relative group"
                >
                  {link.label}
                  <motion.div
                    className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.3)] dark:shadow-[0_0_8px_rgba(14,165,233,0.5)]"
                    initial={{ width: "0%" }}
                    animate={{
                      width: link.href === activeSection ? "100%" : "0%",
                      boxShadow:
                        link.href === activeSection
                          ? ["0 0 8px rgba(14,165,233,0.3)", "0 0 16px rgba(14,165,233,0.3)"]
                          : "0 0 8px rgba(14,165,233,0.0)",
                    }}
                    whileHover={{
                      width: "100%",
                      boxShadow: ["0 0 8px rgba(14,165,233,0.3)", "0 0 16px rgba(14,165,233,0.3)"],
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="sm:hidden p-2 text-neutral-600 dark:text-neutral-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg rounded-lg mt-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }}
                      className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                        link.href === activeSection
                          ? "text-primary-500 dark:text-primary-400 bg-primary-500/10"
                          : "text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="px-3 py-2">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}