"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingDown, Gauge, Zap, BarChart3, Eye } from "lucide-react";

const values = [
  { icon: TrendingDown, title: "Menor fricción operacional", desc: "Elimine cuellos de botella y procesos redundantes." },
  { icon: Gauge, title: "Insights operacionales transversales", desc: "Visibilidad integral en tiempo real: desde inventario y ventas hasta el cierre contable." },
  { icon: Zap, title: "Velocidad de decisión", desc: "De datos a decisiones en minutos, no semanas." },
  { icon: BarChart3, title: "Automatización de procesos críticos", desc: "Flujos inteligentes que operan sin intervención manual." },
  { icon: Eye, title: "Visibilidad ejecutiva superior", desc: "Dashboards consolidados para la alta dirección." },
];

const ValueSection = ({ dict }: { dict: any }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const icons = [TrendingDown, Gauge, Zap, BarChart3, Eye];

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
            {dict.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mt-3">
            {dict.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.items.map((v: any, i: number) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-6"
              >
                <Icon size={24} className="text-gold mb-3" />
                <h3 className="text-primary-foreground font-semibold mb-1 font-body">{v.title}</h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
