"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="nosotros" className="section-padding bg-background" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Sobre Nosotros
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mt-3 mb-6">
            Especialistas en Inteligencia Operacional para entornos ERP
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Datalytix Quest combina expertise en ecosistemas ERP con arquitectura
            de automatización, analítica operacional y sistemas de decisión
            impulsados por inteligencia artificial.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            No somos un partner de implementación ERP. Somos arquitectos de
            inteligencia operacional que transforman su ERP existente en una
            plataforma que automatiza procesos, genera visibilidad en tiempo
            real y acelera la toma de decisiones.
          </p>
          <div className="flex gap-12">
            {[
              { value: "ERP", label: "Ecosistemas" },
              { value: "IA", label: "Decisión" },
              { value: "Auto", label: "Automatización" },
              { value: "Data", label: "Analítica" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-display font-bold text-gold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
