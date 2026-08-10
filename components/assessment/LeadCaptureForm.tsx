"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Lock } from "lucide-react";

interface LeadCaptureFormProps {
  onSubmit: (data: { name: string; email: string; company: string; role: string }) => void;
  isSubmitting: boolean;
}

export default function LeadCaptureForm({ onSubmit, isSubmitting }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", role: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto bg-card border border-border rounded-xl shadow-lg p-8 md:p-12"
    >
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mb-3">
          Diagnóstico Completado
        </h3>
        <p className="text-muted-foreground">
          Hemos calculado su nivel de madurez operacional. Ingrese sus datos para revelar sus resultados instantáneamente y recibir una copia detallada.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Nombre Completo *</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="Ej. Carlos Mendoza"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Email Corporativo *</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="carlos@empresa.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Empresa</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="Nombre de su organización"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">Cargo</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="Ej. Gerente General, CFO"
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full gradient-gold text-accent-foreground font-semibold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Procesando Resultados...
              </>
            ) : (
              <>
                Revelar Resultados
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1.5">
          <Lock size={12} />
          Sus datos están seguros. Solo los utilizaremos para enviar su reporte.
        </p>
      </form>
    </motion.div>
  );
}
