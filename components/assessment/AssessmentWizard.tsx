"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

const questions = [
  { 
    id: "q1", 
    category: "Entorno ERP", 
    text: "¿Qué sistema ERP utiliza su empresa?", 
    options: [
      { label: "SAP", value: 3 }, 
      { label: "NetSuite", value: 3 }, 
      { label: "Microsoft Dynamics", value: 3 },
      { label: "Oracle", value: 3 },
      { label: "Odoo", value: 3 },
      { label: "Otro", value: 2 },
      { label: "Operamos con múltiples sistemas: la información está fragmentada y es difícil de consolidar", value: 1 }
    ] 
  },
  { 
    id: "q2", 
    category: "Entorno ERP", 
    text: "¿Cuál es el modelo de implementación de su ERP?", 
    options: [
      { label: "Cloud / SaaS", value: 3 }, 
      { label: "On-premise", value: 2 }, 
      { label: "Híbrido", value: 2 },
      { label: "La arquitectura está fragmentada entre distintos entornos y es difícil de consolidar", value: 1 }
    ] 
  },
  { 
    id: "q3", 
    category: "Entorno ERP", 
    text: "¿Cuánto tiempo lleva su empresa utilizando el ERP actual?", 
    options: [
      { label: "Recientemente implementado (< 1 año)", value: 1 }, 
      { label: "1-3 años", value: 2 }, 
      { label: "Más de 3 años", value: 3 },
      { label: "Conviven distintas implementaciones: el historial está fragmentado y es difícil de consolidar", value: 1 }
    ] 
  },
  { 
    id: "q4", 
    category: "Visibilidad Operacional", 
    text: "¿Cómo acceden los ejecutivos a los insights operacionales?", 
    options: [
      { label: "Dashboards en tiempo real", value: 4 }, 
      { label: "Reportes del ERP con demora", value: 3 }, 
      { label: "Reportes en Excel", value: 2 },
      { label: "Consolidación manual", value: 1 }
    ] 
  },
  
  { 
    id: "q5", 
    category: "Visibilidad Operacional", 
    text: "¿Cuánto tiempo toma el cierre financiero?", 
    options: [
      { label: "1-3 días", value: 4 }, 
      { label: "4-7 días", value: 3 }, 
      { label: "8-15 días", value: 2 },
      { label: "Más de 15 días", value: 1 }
    ] 
  },
  { 
    id: "q6", 
    category: "Visibilidad Operacional", 
    text: "¿Los ejecutivos tienen visibilidad de KPIs en tiempo real?", 
    options: [
      { label: "Sí, completamente", value: 4 }, 
      { label: "Parcialmente", value: 3 }, 
      { label: "Solo reportes periódicos", value: 2 },
      { label: "Sin visibilidad real", value: 1 }
    ] 
  },
  { 
    id: "q7", 
    category: "Automatización", 
    text: "¿Qué porcentaje de procesos depende de planillas fuera del ERP?", 
    options: [
      { label: "Menos del 10%", value: 4 }, 
      { label: "10-30%", value: 3 }, 
      { label: "30-60%", value: 2 },
      { label: "Más del 60%", value: 1 }
    ] 
  },
  { 
    id: "q8", 
    category: "Automatización", 
    text: "¿Qué tan automatizados están sus procesos operacionales?", 
    options: [
      { label: "Altamente automatizados", value: 4 }, 
      { label: "Parcialmente automatizados", value: 3 }, 
      { label: "Mayormente manuales", value: 2 },
      { label: "Muy manuales", value: 1 }
    ] 
  },

  { 
    id: "q9", 
    category: "Automatización", 
    text: "¿Qué nivel de proactividad tienen las alertas operacionales de su ERP actual?", 
    options: [
      { label: "Proactivas: previenen el problema antes de que suceda", value: 4 }, 
      { label: "Reactivas inmediatas: avisan en el instante en que ocurre el error", value: 3 }, 
      { label: "Manuales/dependientes: requieren que un humano busque el error para encontrarlo", value: 2 },
      { label: "Inexistentes: apagamos incendios sobre problemas ya materializados", value: 1 }
    ] 
  },
  { 
    id: "q10", 
    category: "Inteligencia de Decisión", 
    text: "¿Cómo se detectan anomalías operacionales?", 
    options: [
      { label: "Automáticamente por sistemas", value: 4 }, 
      { label: "Mediante dashboards", value: 3 }, 
      { label: "Mediante análisis manual", value: 2 },
      { label: "Generalmente se detectan tarde", value: 1 }
    ] 
  },
  { 
    id: "q11", 
    category: "Inteligencia de Decisión", 
    text: "¿Qué tan integrados están los sistemas operacionales con su ERP?", 
    options: [
      { label: "Totalmente integrados", value: 4 }, 
      { label: "Parcialmente integrados", value: 3 }, 
      { label: "Mayormente desconectados", value: 2 },
      { label: "Muchas integraciones manuales", value: 1 }
    ] 
  },
  { 
    id: "q12", 
    category: "Inteligencia de Decisión", 
    text: "¿Qué tan rápido puede el liderazgo reaccionar ante cambios operacionales?", 
    options: [
      { label: "Inmediatamente", value: 4 }, 
      { label: "En pocos días", value: 3 }, 
      { label: "Después de preparar reportes", value: 2 },
      { label: "Generalmente demasiado tarde", value: 1 }
    ] 
  },
  { 
    id: "q13", 
    category: "Inteligencia de Decisión", 
    text: "¿Su empresa utiliza algún tipo de Inteligencia Artificial conectada a sus datos operacionales?", 
    options: [
      { label: "Sí, la IA es parte integral de nuestra toma de decisiones", value: 4 }, 
      { label: "Estamos explorando pilotos o pruebas de concepto aisladas", value: 3 }, 
      { label: "Planeamos implementarla, pero no tenemos proyectos activos", value: 2 },
      { label: "No, en lo absoluto", value: 1 }
    ] 
  }
];

export default function AssessmentWizard({ onComplete }: { onComplete: (answers: any[]) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, { label: string, value: number }>>({});

  const handleSelect = (opt: { label: string, value: number }) => {
    setSelectedOptions(prev => ({ ...prev, [questions[currentStep].id]: opt }));
    
    // Auto-advance after a tiny delay for UX
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Build final array
        const finalAnswers = questions.map(q => ({
          question_id: q.id,
          value: selectedOptions[q.id]?.value || opt.value // use the one just selected if it's the last step
        }));
        onComplete(finalAnswers);
      }
    }, 400);
  };

  const progress = ((currentStep) / questions.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[400px] flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-secondary">
        <motion.div 
          className="h-full gradient-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-8 md:p-12 flex-1 flex flex-col justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="mb-8 text-center md:text-left">
              <span className="text-gold text-xs font-bold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full mb-4 inline-block">
                Pregunta {currentStep + 1} de {questions.length} • {questions[currentStep].category}
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-semibold text-primary leading-tight mt-2">
                {questions[currentStep].text}
              </h3>
            </div>

            <div className="space-y-4">
              {questions[currentStep].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left p-5 rounded-lg border-2 transition-all duration-200 flex items-center justify-between group
                    ${selectedOptions[questions[currentStep].id]?.label === opt.label 
                      ? "border-gold bg-gold/5" 
                      : "border-border hover:border-gold/50 hover:bg-background"
                    }`}
                >
                  <span className="text-primary font-medium">{opt.label}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                    ${selectedOptions[questions[currentStep].id]?.label === opt.label ? "border-gold" : "border-muted-foreground/30 group-hover:border-gold/50"}
                  `}>
                    {selectedOptions[questions[currentStep].id]?.label === opt.label && <div className="w-2.5 h-2.5 bg-gold rounded-full" />}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Nav */}
      <div className="px-8 py-4 bg-background border-t border-border flex justify-between items-center">
        <button 
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-30"
        >
          <ArrowLeft size={16} /> Anterior
        </button>
        <span className="text-xs text-muted-foreground">
          {Math.round(progress)}% Completado
        </span>
      </div>
    </div>
  );
}
