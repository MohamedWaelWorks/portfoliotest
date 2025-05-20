import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CursorEffect } from "@/components/cursor-effect";
import { StarBackground } from "@/components/star-background";
import { ScrollProgress } from "@/components/scroll-progress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mohamed Wael | Developer, Designer, Cybersecurity Enthusiast",
  description: "Personal portfolio of Mohamed Wael, showcasing skills in programming, graphic design, cybersecurity, and web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head />
      <body 
        className={`${inter.variable} font-sans antialiased transition-colors duration-300`}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <main className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white min-h-screen relative">
            <ScrollProgress />
            <StarBackground />
            <CursorEffect />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
