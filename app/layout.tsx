import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AOSInitializer } from "@/components/aos-initializer"; // Import AOSInitializer

const inter = Inter({ // Changed from Geist
  subsets: ["latin"],
  variable: "--font-inter", // Changed variable name
});

export const metadata: Metadata = {
  title: "Mohamed Wael | Developer, Designer, Cybersecurity Enthusiast", // Updated title
  description: "Personal portfolio of Mohamed Wael, showcasing skills in programming, graphic design, cybersecurity, and web development.", // Updated description
  // We can add more metadata later, like openGraph, keywords, etc.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The class for dark mode will be managed by a ThemeProvider later
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}> {/* Use new font variable and add a base font-sans */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AOSInitializer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
