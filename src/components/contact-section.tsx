"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { sendEmail } from "@/utils/emailjs-utils";
import { Send, Mail, Phone, Copy, ExternalLink, Check, Twitter } from "lucide-react";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const contactInfo = {    email: "Modywaelabdo@gmail.com",
    phone: "+201062137061",
    social: {
      twitter: "https://x.com/MohamedTweetys"
    }
  };

  const handleCopy = async (type: "email" | "phone") => {
    const text = type === "email" ? contactInfo.email : contactInfo.phone;
    await navigator.clipboard.writeText(text);
    setCopiedField(type);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData(formRef.current);
      const data = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        message: formData.get('message'),
      };
      await sendEmail(data);
      setSubmitStatus("success");
      formRef.current.reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const inputClasses = `w-full px-4 py-3 rounded-lg bg-neutral-900/50
    border border-neutral-800 hover:border-blue-500/50
    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
    text-neutral-200 backdrop-blur-sm
    placeholder:text-neutral-500 transition-all duration-300`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 lg:py-24 relative overflow-hidden bg-[#0a0a0a]"
    >
      {/* Glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Get In Touch
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-neutral-900/50 backdrop-blur-md p-8 rounded-xl border border-neutral-800 hover:border-blue-500/50 transition-all duration-500">
              <h3 className="text-2xl font-semibold text-white mb-6">Direct Contact</h3>
              
              {/* Email */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-neutral-300 mb-2">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span>Email:</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                  >
                    {contactInfo.email}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleCopy("email")}
                    className="p-2 hover:bg-neutral-700 rounded-md transition-colors"
                    title="Copy email"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-neutral-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div>
                <div className="flex items-center space-x-2 text-neutral-300 mb-2">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span>Phone:</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                  >
                    {contactInfo.phone}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleCopy("phone")}
                    className="p-2 hover:bg-neutral-700 rounded-md transition-colors"
                    title="Copy phone"
                  >
                    {copiedField === "phone" ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-neutral-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-6 pt-6 border-t border-neutral-800">
                <h4 className="text-lg font-medium text-white mb-4">Connect With Me</h4>                <div className="flex items-center justify-center">
                  <motion.a
                    href={contactInfo.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-neutral-800/50 rounded-lg hover:bg-blue-500/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter className="w-6 h-6 text-neutral-200" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 bg-neutral-900/50 backdrop-blur-md p-8 rounded-xl border border-neutral-800 hover:border-blue-500/50 transition-all duration-500"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className={inputClasses}
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className={inputClasses}
                  placeholder="your.email@example.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className={inputClasses}
                  placeholder="Your message"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600
                           text-white font-medium py-3 px-6 rounded-lg
                           transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </motion.div>

              {submitStatus !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`text-center p-4 rounded-lg backdrop-blur-sm ${
                    submitStatus === "success"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  <motion.div
                    animate={{ scale: [0.95, 1.05, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    {submitStatus === "success"
                      ? "Message sent successfully! ✨"
                      : "Failed to send message. Please try again. 🔄"}
                  </motion.div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}