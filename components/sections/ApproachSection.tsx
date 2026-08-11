"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Assessment & Diagnóstico Rápido",
    desc: "Una evaluación de su entorno ERP que identifica de inmediato los cuellos de botella y oportunidades clave de automatización.",
    tag: "1–2 días",
  },
  {
    number: "02",
    title: "Activación Temprana",
    desc: "Conexión ágil a su ERP y despliegue de los primeros dashboards operacionales y flujos automatizados funcionales.",
    tag: "Primera semana",
  },
  {
    number: "03",
    title: "Expansión & Mejora Continua",
    desc: "Desarrollo de nuevas capacidades, integración de otras fuentes de datos y escalabilidad de agentes de Inteligencia Artificial.",
    tag: "Continuo",
  },
];

const ApproachSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="metodologia" className="section-padding bg-card" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Metodología
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mt-3 mb-6">
            Tres pasos hacia la inteligencia operacional
          </h2>
        </motion.div>

        <div className="space-y-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="flex gap-6 md:gap-10 items-start border-b border-border pb-8 last:border-b-0"
            >
              <span className="text-5xl font-display font-bold text-gold/30 shrink-0">
                {s.number}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-primary font-body">
                    {s.title}
                  </h3>
                  <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
                    {s.tag}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
