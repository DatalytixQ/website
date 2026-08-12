"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = ({ dict }: { dict: any }) => {
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
            {dict.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mt-3 mb-6">
            {dict.title}
          </h2>
          {dict.paragraphs.map((p: string, idx: number) => (
            <p key={idx} className="text-muted-foreground leading-relaxed mb-6">
              {p}
            </p>
          ))}
          <div className="flex gap-12 mt-2">
            {dict.stats.map((s: any) => (
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
