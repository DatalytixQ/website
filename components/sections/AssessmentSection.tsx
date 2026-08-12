"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import AssessmentWizard from "@/components/assessment/AssessmentWizard";
import LeadCaptureForm from "@/components/assessment/LeadCaptureForm";
import ResultsView from "@/components/assessment/ResultsView";

type Step = "intro" | "wizard" | "lead" | "results";

interface AssessmentSectionProps {
  dict: {
    badge: string;
    title: string;
    description: string;
    tags: string[];
    cta: string;
    meta: string;
    errors: {
      processing: string;
      connection: string;
    };
    wizard: any;
    lead: any;
    results: any;
  };
}

const AssessmentSection = ({ dict }: AssessmentSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  const handleWizardComplete = (finalAnswers: any[]) => {
    setAnswers(finalAnswers);
    setStep("lead");
  };

  const handleFormSubmit = async (leadData: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadData,
          answers,
        }),
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        setResultData(data);
        setStep("results");
      } else {
        alert(data.error || dict.errors.processing);
      }
    } catch (error) {
      console.error(error);
      alert(dict.errors.connection);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="assessment" className="section-padding bg-background" ref={ref}>
      <div className="container-narrow">
        {step === "intro" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              {dict.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mt-4 mb-6">
              {dict.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
              {dict.description}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {dict.tags.map((tag) => (
                <span key={tag} className="bg-secondary/50 text-primary text-sm font-medium px-5 py-2.5 rounded-full border border-border/50">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col items-center">
              <button 
                onClick={() => setStep("wizard")}
                className="gradient-gold text-white font-semibold px-10 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all text-base shadow-lg shadow-gold/20 hover:scale-105 duration-200"
              >
                {dict.cta} <ArrowRight size={18} />
              </button>
              <span className="text-muted-foreground text-sm mt-4 font-medium">{dict.meta}</span>
            </div>
          </motion.div>
        )}

        {step === "wizard" && (
          <AssessmentWizard onComplete={handleWizardComplete} dict={dict.wizard} />
        )}

        {step === "lead" && (
          <LeadCaptureForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} dict={dict.lead} />
        )}

        {step === "results" && resultData && (
          <ResultsView resultData={resultData} dict={dict.results} />
        )}
      </div>
    </section>
  );
};

export default AssessmentSection;
