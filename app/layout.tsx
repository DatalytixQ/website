import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Datalytix Quest | Inteligencia Operacional y Automatización con IA",
  description: "Consultoría especializada en optimización de ERP, automatización de procesos empresariales e implementación de Inteligencia Artificial para PyMEs y corporativos.",
  metadataBase: new URL("https://datalytixquest.com"),
  keywords: [
    "Inteligencia Operacional", 
    "Automatización de procesos", 
    "Implementación de IA para empresas", 
    "Consultoría ERP", 
    "Transformación Digital", 
    "IA para independientes", 
    "Datalytix Quest"
  ],
  authors: [{ name: "Datalytix Quest" }],
  openGraph: {
    title: "Datalytix Quest | Inteligencia Operacional y Automatización",
    description: "Descubre cuánta fricción operativa oculta tu ERP y cómo la Inteligencia Artificial puede recuperar la rentabilidad de tu negocio.",
    url: "https://datalytixquest.com",
    siteName: "Datalytix Quest",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Configuración de Schema.org para SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Consulting",
  "name": "Datalytix Quest",
  "url": "https://datalytixquest.com",
  "description": "Consultoría especializada en optimización de ERP, automatización de procesos empresariales e Inteligencia Operacional.",
  "sameAs": [
    "https://www.linkedin.com/company/datalytixquest"
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        {/* Google Analytics 4 (Reemplazar G-XXXXXXXXXX con tu ID real) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-YGDGE89CFX`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YGDGE89CFX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        
        {/* Schema.org Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {children}
      </body>
    </html>
  );
}
