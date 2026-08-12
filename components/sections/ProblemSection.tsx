"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Clock, Eye, Cog } from "lucide-react";

interface ProblemSectionProps {
  dict: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    items: Array<{ title: string; desc: string }>;
  };
}

const ProblemSection = ({ dict }: ProblemSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const icons = [Eye, Clock, Cog, AlertTriangle];

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
            {dict.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mt-3 mb-6">
            {dict.title1} <br className="hidden md:block" />
            {dict.title2}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            {dict.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {dict.items.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="border border-border rounded-lg p-8 bg-background hover:border-gold/40 transition-colors group"
              >
                <Icon
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
