"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "El Problema", href: "#problema" },
    { label: "Solución", href: "#solucion" },
    { label: "Metodología", href: "#metodologia" },
    { label: "Assessment", href: "#assessment" },
    { label: "Contacto", href: "#nosotros" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container-wide flex items-center justify-between h-16">
        <a href="#" className="font-display text-xl font-bold tracking-tight text-primary">
          Datalytix Quest
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#assessment"
            className="gradient-gold text-accent-foreground text-sm font-semibold px-5 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Evaluar Mi ERP
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#assessment"
                onClick={() => setOpen(false)}
                className="gradient-gold text-accent-foreground text-sm font-semibold px-5 py-2.5 rounded-md text-center"
              >
                Evaluar Mi ERP
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
