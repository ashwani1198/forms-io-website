"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/content";
import { useTheme } from "@/lib/theme";

function Logo() {
  const { theme } = useTheme();
  return (
    <a href="#" className="flex items-center gap-2.5">
      <div
        className={cn(
          "w-7 h-7 rounded-md flex items-center justify-center",
          theme === "dark" ? "bg-foreground" : "bg-foreground"
        )}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 4h10M3 8h7M3 12h8" stroke="var(--background)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      <span className="text-base font-semibold tracking-tight text-foreground">
        FormsIO
      </span>
    </a>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={(e) => toggle(e.nativeEvent)}
      aria-label="Toggle theme"
      className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-border-hover transition-colors"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blog");
  const visibleLinks = isBlog
    ? navLinks.filter((l) => l.label !== "Features" && l.label !== "Templates")
    : navLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border backdrop-blur-xl" : "",
        scrolled && theme === "dark" ? "bg-background/80" : "",
        scrolled && theme === "light" ? "bg-background/90" : ""
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {visibleLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
            Log in
          </a>
          <a
            href="#"
            className="glow-btn text-sm font-semibold px-5 py-2 rounded-full shadow-sm"
          >
            Get Started
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {visibleLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-border mt-2">
                <a
                  href="#"
                  className="block px-3 py-2.5 text-sm font-medium text-center rounded-lg border border-cta-border text-foreground"
                >
                  Log in
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
