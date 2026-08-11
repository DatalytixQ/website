import { Calendar, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contacto" className="bg-primary px-6 lg:px-24 py-12 border-t border-white/10">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-4 gap-10 md:gap-8 mb-12">
        {/* Marca y Slogan */}
        <div className="lg:col-span-1">
          <p className="font-display text-2xl font-bold text-white mb-2">Datalytix Quest</p>
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Inteligencia Operacional
          </p>
          <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
            Transformando sistemas de registro contable en verdaderas plataformas de decisión ejecutiva en tiempo real.
          </p>
        </div>

        {/* Contacto USA, LATAM & Acción */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-4">
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">Operaciones LATAM</h4>
            <div className="flex items-start gap-3 text-primary-foreground/60 text-sm">
              <MapPin size={16} className="mt-0.5 text-gold shrink-0" />
              <p>Santiago, Chile</p>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/60 text-sm">
              <Mail size={16} className="text-gold shrink-0" />
              <a href="mailto:latam@datalytixquest.com" className="hover:text-white transition-colors">
                latam@datalytixquest.com
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">Operaciones USA</h4>
            <div className="flex items-start gap-3 text-primary-foreground/60 text-sm">
              <MapPin size={16} className="mt-0.5 text-gold shrink-0" />
              <p>Miami, FL</p>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/60 text-sm">
              <Mail size={16} className="text-gold shrink-0" />
              <a href="mailto:usa@datalytixquest.com" className="hover:text-white transition-colors">
                usa@datalytixquest.com
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">Contacto</h4>
            <a
              href="https://calendly.com/darioquintas/conversacion-estrategica-inteligencia-operacional"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium bg-white/5 px-5 py-3 rounded-md border border-white/10"
            >
              <Calendar size={16} className="text-gold" />
              Conversación Estratégica
            </a>
          </div>
        </div>
      </div>

      <div className="container-wide flex flex-col md:flex-row justify-center items-center gap-4 pt-8 border-t border-white/10">
        <p className="text-primary-foreground/40 text-xs text-center">
          © {new Date().getFullYear()} Datalytix Quest. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
