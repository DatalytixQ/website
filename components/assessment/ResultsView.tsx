"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Calendar, Download, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

interface ResultsViewProps {
  resultData: {
    score: number;
    friction_level: string;
    name?: string;
    category_percentages?: {
      entorno: number;
      visibilidad: number;
      automatizacion: number;
      inteligencia: number;
    };
    findings?: { title: string; description: string }[];
  };
}

export default function ResultsView({ resultData }: ResultsViewProps) {
  const { score, friction_level, category_percentages, findings, name } = resultData;
  const maxRawScore = 49;
  
  // Normalizar el score a una escala de 100
  const normalizedScore = Math.round((score / maxRawScore) * 100);

  let levelColor = "text-red-600";
  let subtitle = "Su ERP opera principalmente como sistema de registro. Hay un alto potencial de transformación.";

  if (friction_level === "Bajo") {
    levelColor = "text-green-600";
    subtitle = "Su entorno es altamente maduro. El siguiente paso es explorar modelos predictivos avanzados.";
  } else if (friction_level === "Medio") {
    levelColor = "text-yellow-600";
    subtitle = "La organización ha resuelto lo básico, pero existe una gran oportunidad para automatizar flujos y ganar visibilidad real.";
  }

  const reportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setIsDownloading(true);

    try {
      // Importación dinámica para evitar errores SSR con Next.js
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // Alta resolución
        useCORS: true,
        logging: false,
        backgroundColor: "#0B0F19", // Coincide con el background oscuro
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Reporte-Inteligencia-Operacional-DQ.pdf");
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Hubo un problema al generar el PDF. Intente nuevamente.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col space-y-8 pb-12">
      
      {/* Contenedor capturable para el PDF */}
      <div ref={reportRef} className="space-y-8 bg-background p-4 md:p-8 -m-4 md:-m-8 rounded-xl">
        {/* Header Results */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-gold w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">
            Resultado: {normalizedScore} <span className="text-2xl text-muted-foreground">/ 100</span>
          </h2>
          <p className={`text-lg font-medium ${levelColor}`}>Nivel de Fricción Operativa: {friction_level}</p>
          <p className="text-muted-foreground max-w-2xl mx-auto pt-2">{subtitle}</p>
        </motion.div>

        {/* Desglose por Área */}
        {category_percentages && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-primary mb-6">Desglose por área:</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Entorno ERP</span>
                <span className="font-bold text-primary">{category_percentages.entorno}%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Visibilidad Operacional</span>
                <span className="font-bold text-primary">{category_percentages.visibilidad}%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">Automatización</span>
                <span className="font-bold text-primary">{category_percentages.automatizacion}%</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Inteligencia de Decisión</span>
                <span className="font-bold text-primary">{category_percentages.inteligencia}%</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Hallazgos y Riesgos */}
        {findings && findings.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm"
          >
            <h3 className="text-xl font-display font-bold text-primary mb-6">Hallazgos e impacto potencial en su operación</h3>
            <div className="space-y-6">
              {findings.map((finding, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-0.5">
                    <AlertTriangle className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm md:text-base">{finding.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{finding.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-border/50">
              <p className="text-xs italic text-muted-foreground opacity-80">Estos hallazgos son preliminares y están diseñados para orientar una conversación estratégica con Datalytix Quest.</p>
            </div>
          </motion.div>
        )}
      </div>
      {/* Fin del contenedor capturable */}

      {/* Mensaje de Agradecimiento */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center pt-4"
      >
        <p className="text-muted-foreground">
          Gracias{name ? `, ${name}` : ""}. Nuestro equipo se pondrá en contacto con usted a la brevedad.
        </p>
      </motion.div>

      {/* CTA final */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-secondary/50 border border-border rounded-xl p-8 md:p-10 text-center mt-4"
      >
        <h3 className="text-2xl font-display font-bold text-primary mb-3">Revisemos estos hallazgos sobre su operación</h3>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Una sesión de 45 minutos para cuantificar el impacto y priorizar las primeras oportunidades de automatización.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="https://calendly.com/darioquintas/conversacion-estrategica-inteligencia-operacional" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto gradient-gold text-white font-semibold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg hover:scale-105 duration-200"
          >
            <Calendar size={18} />
            Agendar Sesión de Diagnóstico
          </a>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={`w-full sm:w-auto border border-border font-medium px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 transition-all ${isDownloading ? 'opacity-60 cursor-not-allowed bg-secondary/30 text-muted-foreground' : 'hover:bg-primary-foreground/10 text-primary-foreground cursor-pointer'}`}
          >
            {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            {isDownloading ? 'Generando PDF...' : 'Descargar Reporte PDF'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
