"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-navy overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-1 gradient-gold" />

      <div className="relative z-10 container-wide pt-32 pb-16 flex flex-col items-center text-center">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex justify-center"
          >
            <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase bg-gold/10 px-4 py-1.5 rounded-full border border-gold/20">
              Inteligencia Operacional para ERP
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-8"
          >
            Transforme Su ERP en un Sistema de <span className="text-gold">Inteligencia Operacional</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl lg:text-2xl text-primary-foreground/70 leading-relaxed mb-12 max-w-4xl mx-auto"
          >
            Automatice procesos empresariales, obtenga visibilidad en tiempo real y tome decisiones más rápidas implementando Inteligencia Artificial sobre su ERP actual.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <a
              href="#assessment"
              className="gradient-gold text-accent-foreground font-semibold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-base md:text-lg"
            >
              Realizar el Assessment
              <ArrowRight size={18} />
            </a>
            <a
              href="https://calendly.com/darioquintas/conversacion-estrategica-inteligencia-operacional"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary-foreground/30 text-primary-foreground font-medium px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/10 transition-colors text-base md:text-lg"
            >
              <Calendar size={18} />
              Conversación Estratégica
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
