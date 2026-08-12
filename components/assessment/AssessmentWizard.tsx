"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function AssessmentWizard({ onComplete, dict }: { onComplete: (answers: any[]) => void, dict: any }) {
  const { questions, progress: progressDict, nav } = dict;
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
        const finalAnswers = questions.map((q: any) => ({
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
                {progressDict.questionText} {currentStep + 1} {progressDict.of} {questions.length} • {questions[currentStep].category}
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-semibold text-primary leading-tight mt-2">
                {questions[currentStep].text}
              </h3>
            </div>

            <div className="space-y-4">
              {questions[currentStep].options.map((opt: any, i: number) => (
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
          <ArrowLeft size={16} /> {nav.previous}
        </button>
        <span className="text-xs text-muted-foreground">
          {Math.round(progress)}% {progressDict.completed}
        </span>
      </div>
    </div>
  );
}
