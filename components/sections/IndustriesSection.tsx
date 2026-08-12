"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Factory, Truck, Package, ShoppingBag, Cpu, Briefcase } from "lucide-react";

const industries = [
  { icon: Factory, label: "Manufactura" },
  { icon: Truck, label: "Distribución" },
  { icon: Package, label: "Logística" },
  { icon: ShoppingBag, label: "Retail" },
  { icon: Cpu, label: "Tecnología" },
  { icon: Briefcase, label: "Servicios Profesionales" },
];

const IndustriesSection = ({ dict }: { dict: any }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const icons = [Factory, Truck, Package, ShoppingBag, Cpu, Briefcase];

  return (
    <section className="section-padding bg-card" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            {dict.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mt-3 mb-4">
            {dict.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {dict.description}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {dict.items.map((ind: any, i: number) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="flex flex-col items-center gap-3 px-8 py-6 border border-border rounded-lg bg-background hover:border-gold/40 transition-colors min-w-[140px]"
              >
                <Icon size={28} className="text-gold" />
                <span className="text-sm font-medium text-primary">{ind.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
