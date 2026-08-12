import { Calendar, Mail, MapPin } from "lucide-react";

const Footer = ({ dict }: { dict: any }) => {
  return (
    <footer id="contacto" className="bg-primary px-6 lg:px-24 py-12 border-t border-white/10">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-4 gap-10 md:gap-8 mb-12">
        {/* Marca y Slogan */}
        <div className="lg:col-span-1">
          <p className="font-display text-2xl font-bold text-white mb-2">{dict.brand}</p>
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">
            {dict.badge}
          </p>
          <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
            {dict.description}
          </p>
        </div>

        {/* Contacto USA, LATAM & Acción */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-4">
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">{dict.latam.title}</h4>
            <div className="flex items-start gap-3 text-primary-foreground/60 text-sm">
              <MapPin size={16} className="mt-0.5 text-gold shrink-0" />
              <p>{dict.latam.location}</p>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/60 text-sm">
              <Mail size={16} className="text-gold shrink-0" />
              <a href={`mailto:${dict.latam.email}`} className="hover:text-white transition-colors">
                {dict.latam.email}
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">{dict.usa.title}</h4>
            <div className="flex items-start gap-3 text-primary-foreground/60 text-sm">
              <MapPin size={16} className="mt-0.5 text-gold shrink-0" />
              <p>{dict.usa.location}</p>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/60 text-sm">
              <Mail size={16} className="text-gold shrink-0" />
              <a href={`mailto:${dict.usa.email}`} className="hover:text-white transition-colors">
                {dict.usa.email}
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">{dict.contact.title}</h4>
            <a
              href="https://calendly.com/darioquintas/conversacion-estrategica-inteligencia-operacional"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium bg-white/5 px-5 py-3 rounded-md border border-white/10"
            >
              <Calendar size={16} className="text-gold" />
              {dict.contact.cta}
            </a>
          </div>
        </div>
      </div>

      <div className="container-wide flex flex-col md:flex-row justify-center items-center gap-4 pt-8 border-t border-white/10">
        <p className="text-primary-foreground/40 text-xs text-center">
          © {new Date().getFullYear()} {dict.brand}. {dict.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
