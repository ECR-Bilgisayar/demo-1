import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Hakkında", href: "#about" },
  { label: "Deneyim", href: "#experience" },
  { label: "Mekan", href: "#venue" },
  { label: "Program", href: "#agenda" },
  { label: "SSS", href: "#faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className={`font-heading text-lg transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
          GLS 2026
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-body text-xs tracking-wider uppercase transition-colors hover:text-gold ${
                scrolled ? "text-muted-foreground" : "text-primary-foreground/70"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#register"
            className="font-body text-xs tracking-wider uppercase bg-gold text-navy-dark px-5 py-2 rounded hover:bg-gold-light transition-colors"
          >
            Şimdi Başvur
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden font-body text-xs tracking-wider uppercase ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
        >
          {menuOpen ? "Kapat" : "Menü"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-sm text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#register"
                onClick={() => setMenuOpen(false)}
                className="font-body text-sm font-semibold text-gold"
              >
                Şimdi Başvur
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
