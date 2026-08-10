"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingDown, Gauge, Zap, BarChart3, Eye } from "lucide-react";

const values = [
  { icon: TrendingDown, title: "Menor fricción operacional", desc: "Elimine cuellos de botella y procesos redundantes." },
  { icon: Gauge, title: "Insights financieros más rápidos", desc: "Cierre contable acelerado y reportes en tiempo real." },
  { icon: Zap, title: "Velocidad de decisión", desc: "De datos a decisiones en minutos, no semanas." },
  { icon: BarChart3, title: "Automatización de procesos críticos", desc: "Flujos inteligentes que operan sin intervención manual." },
  { icon: Eye, title: "Visibilidad ejecutiva superior", desc: "Dashboards consolidados para la alta dirección." },
];

const ValueSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding gradient-navy" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Propuesta de Valor
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mt-3">
            Resultados que transforman operaciones
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-6"
            >
              <v.icon size={24} className="text-gold mb-3" />
              <h3 className="text-primary-foreground font-semibold mb-1 font-body">{v.title}</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
