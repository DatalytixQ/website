"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Necesito reemplazar mi ERP actual para trabajar con ustedes?",
    answer: "No. Nuestra metodología se basa en instalar capas de inteligencia (Dashboards, IA, Automatización) por encima de su sistema actual, sin intervenir su configuración base ni requerir migraciones costosas.",
  },
  {
    question: "¿Cuánto tiempo toma ver resultados?",
    answer: "El primer paso es el Diagnóstico de 40 horas, donde en solo 5 días mapeamos toda la fricción operacional. La implementación posterior (Fase 3) entrega 'Quick Wins' en las primeras 3 a 4 semanas.",
  },
  {
    question: "¿Qué esfuerzo de TI requiere de mi lado?",
    answer: "Mínimo. Generalmente solo necesitamos credenciales de lectura a sus fuentes de datos. Nuestro equipo de ingeniería se encarga de los conectores, el modelado, la arquitectura y la seguridad.",
  },
  {
    question: "¿Necesito pagar licencias por cada usuario?",
    answer: "El objetivo es democratizar la información. Dependiendo de la arquitectura implementada, evitamos el cobro por asiento para que toda la gerencia y operación pueda usar la plataforma sin fricciones presupuestarias.",
  },
  {
    question: "¿Cómo protegen la confidencialidad de mis datos?",
    answer: "Aplicamos protocolos enterprise: encriptación de datos en tránsito y en reposo, y gobierno de acceso por roles (Row-Level Security). Nadie ve información para la que no tiene permisos explícitos.",
  },
  {
    question: "¿Existe soporte técnico y mantenimiento continuo?",
    answer: "Sí. No entregamos software y nos vamos. Nuestro modelo incluye continuidad operativa, monitoreo de los flujos de datos y soporte para adaptar los modelos ante cambios en su negocio.",
  }
];

const FAQSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-card" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Resolviendo Dudas
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mt-3 mb-6">
            Preguntas Frecuentes
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="border border-border rounded-lg bg-background overflow-hidden h-fit"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-semibold text-primary font-body pr-4 text-sm">{faq.question}</span>
                <ChevronDown
                  className={`text-gold shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-muted-foreground leading-relaxed text-sm">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
