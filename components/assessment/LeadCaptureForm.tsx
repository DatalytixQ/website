"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Lock } from "lucide-react";

interface LeadCaptureFormProps {
  onSubmit: (data: { name: string; email: string; company: string; role: string }) => void;
  isSubmitting: boolean;
  dict: any;
}

export default function LeadCaptureForm({ onSubmit, isSubmitting, dict }: LeadCaptureFormProps) {
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
          {dict.title}
        </h3>
        <p className="text-muted-foreground">
          {dict.description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">{dict.name}</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder={dict.namePlaceholder}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">{dict.email}</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder={dict.emailPlaceholder}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">{dict.company}</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder={dict.companyPlaceholder}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary">{dict.role}</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder={dict.rolePlaceholder}
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
                {dict.submitting}
              </>
            ) : (
              <>
                {dict.submit}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1.5">
          <Lock size={12} />
          {dict.privacy}
        </p>
      </form>
    </motion.div>
  );
}
