"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Clock, Eye, Cog } from "lucide-react";

const problems = [
  {
    icon: Eye,
    title: "Visibilidad limitada en tiempo real",
    desc: "Los reportes se generan días después, cuando las decisiones ya fueron tomadas.",
  },
  {
    icon: Clock,
    title: "Ciclos de cierre financiero lentos",
    desc: "Procesos manuales que extienden los cierres y retrasan la información crítica.",
  },
  {
    icon: Cog,
    title: "Ineficiencias operacionales",
    desc: "Tareas repetitivas que consumen recursos y generan errores evitables.",
  },
  {
    icon: AlertTriangle,
    title: "Alta dependencia de procesos manuales",
    desc: "Planillas, emails y flujos desconectados que fragmentan la operación.",
  },
];

const ProblemSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problema" className="section-padding bg-card" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            El Problema
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mt-3 mb-6">
            Su ERP registra transacciones. <br className="hidden md:block" />
            Pero no genera inteligencia operacional.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            La mayoría de las empresas implementan un ERP esperando control
            operacional total. Sin embargo, muchas siguen dependiendo de
            planillas de cálculo, reportes manuales, sistemas desconectados y
            decisiones tardías.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="border border-border rounded-lg p-8 bg-background hover:border-gold/40 transition-colors group"
            >
              <p.icon
                size={28}
                className="text-gold mb-4 group-hover:scale-110 transition-transform"
              />
              <h3 className="text-lg font-semibold text-primary mb-2 font-body">
                {p.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
