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

      <div className="relative z-10 container-wide pt-32 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* Columna Izquierda: Texto */}
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase">
              Inteligencia Operacional para ERP
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-[1.1] mb-6"
          >
            Transforme Su ERP en un Sistema de <span className="text-gold">Inteligencia Operacional</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-10 max-w-2xl"
          >
            Datalytix Quest ayuda a organizaciones a automatizar operaciones, obtener visibilidad en tiempo real y tomar decisiones más rápidas instalando capas de inteligencia sobre su ERP y el resto de su ecosistema de sistemas (CRM, aplicaciones legadas, bases de datos y otras fuentes).
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-start"
          >
            <a
              href="#assessment"
              className="gradient-gold text-accent-foreground font-semibold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-base"
            >
              Realizar el Assessment
              <ArrowRight size={18} />
            </a>
            <a
              href="https://calendly.com/darioquintas/conversacion-estrategica-inteligencia-operacional"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary-foreground/30 text-primary-foreground font-medium px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/10 transition-colors text-base"
            >
              <Calendar size={18} />
              Agendar Conversación Estratégica
            </a>
          </motion.div>
        </div>

        {/* Columna Derecha: Animación de Datos (Solo Desktop) */}
        <div className="hidden lg:flex relative w-full h-[550px] items-center justify-center perspective-1000">
          
          {/* Marca de agua (Opción 3) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.04, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute -right-20 w-[120%] h-[120%] pointer-events-none"
          >
            <img 
              src="/logo.png" 
              alt="" 
              className="w-full h-full object-contain filter grayscale" 
            />
          </motion.div>

          {/* Core (ERP) */}
          <motion.div
            animate={{ 
              boxShadow: ["0px 0px 20px 0px rgba(212,175,55,0.2)", "0px 0px 60px 10px rgba(212,175,55,0.5)", "0px 0px 20px 0px rgba(212,175,55,0.2)"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-20 w-28 h-28 bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/40 rounded-full flex items-center justify-center backdrop-blur-md"
          >
            <span className="text-gold font-display font-bold tracking-widest text-sm">ERP</span>
          </motion.div>

          {/* Anillos de interconexión (Opción 2) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute z-10 w-[320px] h-[320px] border border-primary-foreground/10 rounded-full"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400/60 rounded-full blur-[2px]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-purple-400/60 rounded-full blur-[1px]" />
          </motion.div>
          
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute z-10 w-[480px] h-[480px] border border-gold/15 border-dashed rounded-full"
          >
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gold/50 rounded-full blur-[2px]" />
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/50 rounded-full" />
          </motion.div>

          {/* Mockup Flotante Abstraído (Glassmorphism) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: [-15, 15, -15], opacity: 1 }}
            transition={{ y: { duration: 7, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1.5, delay: 0.5 } }}
            className="absolute z-30 -right-4 top-20 w-56 h-36 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md p-5 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="w-full h-2 bg-white/10 rounded-full mb-3" />
              <div className="w-3/4 h-2 bg-gold/30 rounded-full mb-4" />
            </div>
            <div className="flex items-end gap-3 h-14">
              <div className="w-1/3 bg-gold/30 h-[60%] rounded-t-sm" />
              <div className="w-1/3 bg-gold/60 h-[80%] rounded-t-sm" />
              <div className="w-1/3 bg-gold h-[100%] rounded-t-sm" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
