"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "El Problema", href: "#problema" },
    { label: "Solución", href: "#solucion" },
    { label: "Metodología", href: "#metodologia" },
    { label: "Assessment", href: "#assessment" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container-wide flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 font-display text-xl font-bold tracking-tight text-primary">
          <img 
            src="/logo.png" 
            alt="Datalytix Quest Logo" 
            className="w-8 h-8 object-contain"
          />
          Datalytix Quest
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#assessment"
            className="gradient-gold text-accent-foreground text-sm font-semibold px-5 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Evaluar Mi ERP
          </Link>
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
            <div className="flex flex-col items-start gap-4 px-6 py-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="#assessment"
                onClick={() => setOpen(false)}
                className="gradient-gold text-accent-foreground text-sm font-semibold px-5 py-2.5 rounded-md mt-2"
              >
                Evaluar Mi ERP
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
