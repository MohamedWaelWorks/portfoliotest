"use client";

import { Github, Linkedin, Mail, FileText } from "lucide-react"; // Using Lucide for consistency
// You can add more icons from react-icons if needed, e.g., FaTwitter, FaInstagram

interface SocialLink {
  href: string;
  icon: React.ElementType;
  label: string;
  aosDelay?: string;
}

const socialLinks: SocialLink[] = [
  { href: "https://github.com/MohamedWaelWorks", icon: Github, label: "GitHub", aosDelay: "0" }, // Replace with your GitHub link
  { href: "https://www.linkedin.com/in/mohamed-wael-9b220830b/", icon: Linkedin, label: "LinkedIn", aosDelay: "100" }, // Replace with your LinkedIn link
  { href: "mailto:modywaelabdo@gmail.com", icon: Mail, label: "Email", aosDelay: "200" },
  { href: "/mody cv.pdf", icon: FileText, label: "Resume", aosDelay: "300" }, // Links to the resume in public folder
];

export function Footer() {
  return (
    <footer className="py-10 sm:py-12 bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 sm:space-x-8 mb-6 sm:mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : "_self"}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
              download={link.label === "Resume"} // Add download attribute for resume
              className="text-neutral-500 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-500 transition-colors duration-300"
              aria-label={`Link to Mohamed Wael's ${link.label}`}
              data-aos="fade-up"
              data-aos-delay={link.aosDelay}
            >
              <link.icon size={28} className="sm:w-8 sm:h-8" /> {/* Increased icon size */}
            </a>
          ))}
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400" data-aos="fade-up" data-aos-delay="400">
          © {new Date().getFullYear()} Mohamed Wael. All rights reserved.
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2" data-aos="fade-up" data-aos-delay="500">
          Built with Next.js, Tailwind CSS, and ❤️. Deployed on Vercel.
        </p>
      </div>
    </footer>
  );
}