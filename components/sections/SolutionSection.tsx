"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Bot, BarChart3, Brain, Lightbulb, ShieldCheck, Layers } from "lucide-react";

const pillars = [
  { icon: Zap, label: "Automatización operacional" },
  { icon: Bot, label: "Monitoreo impulsado por IA" },
  { icon: BarChart3, label: "Dashboards ejecutivos" },
  { icon: Brain, label: "Inteligencia de decisión" },
  { icon: Lightbulb, label: "Insights automatizados" },
];

const sources = [
  "ERP (núcleo)",
  "CRM",
  "Sistemas legados",
  "Bases de datos",
  "Otras fuentes",
  "APIs y archivos",
];

const guarantees = [
  "Cero intervención sobre sus sistemas",
  "Sin customizaciones",
  "Sin riesgo en upgrades",
];

const outcomes = [
  "Ciclos de decisión más rápidos",
  "Mayor eficiencia operacional",
  "Visibilidad operacional en tiempo real",
];

const SolutionSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solucion" className="section-padding gradient-navy" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            La Solución
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mt-3 mb-6">
            Inteligencia Operacional para Entornos ERP
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
            Instalamos capas de inteligencia operacional por encima de su ERP
            existente —sin modificarlo ni intervenir su configuración—
            transformándolo de un sistema de registro a una plataforma de
            decisión en tiempo real.
          </p>
          <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed mt-4">
            El ERP es la base, no el límite: la operación también vive en el CRM,
            en sistemas legados, en bases de datos y en otras fuentes. La
            inteligencia operacional se construye sobre todas esas fuentes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {sources.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/80 border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-2 rounded-full"
            >
              <Layers size={15} className="text-gold" />
              {s}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {guarantees.map((g) => (
            <span
              key={g}
              className="inline-flex items-center gap-2 text-sm font-medium text-gold border border-gold/30 bg-gold/10 px-4 py-2 rounded-full"
            >
              <ShieldCheck size={15} />
              {g}
            </span>
          ))}
        </motion.div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-6 text-center"
            >
              <p.icon size={32} className="text-gold mx-auto mb-4" />
              <p className="text-primary-foreground font-medium text-sm">
                {p.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-l-2 border-gold pl-8"
        >
          <p className="text-primary-foreground/50 text-sm font-semibold uppercase tracking-widest mb-4">
            Resultados
          </p>
          <ul className="space-y-3">
            {outcomes.map((o) => (
              <li key={o} className="text-primary-foreground text-lg font-medium">
                → {o}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
