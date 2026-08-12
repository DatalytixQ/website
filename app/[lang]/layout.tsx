import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const lang = (await params).lang || 'es';

  if (lang === 'en') {
    return {
      title: "Datalytix Quest | Operational Intelligence & AI Automation",
      description: "Specialized consulting in ERP optimization, business process automation, and Artificial Intelligence implementation.",
      metadataBase: new URL("https://datalytixquest.com"),
      keywords: [
        "Operational Intelligence", 
        "Process Automation", 
        "Enterprise AI Implementation", 
        "ERP Consulting", 
        "Digital Transformation", 
        "Datalytix Quest"
      ],
      authors: [{ name: "Datalytix Quest" }],
      openGraph: {
        title: "Datalytix Quest | Operational Intelligence & Automation",
        description: "Discover how much operational friction your ERP hides and how Artificial Intelligence can recover your business profitability.",
        url: "https://datalytixquest.com",
        siteName: "Datalytix Quest",
        locale: "en_US",
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
  }

  return {
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
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang || 'es';

  // Configuración de Schema.org para SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Consulting",
    "name": "Datalytix Quest",
    "url": "https://datalytixquest.com",
    "description": lang === 'en' 
      ? "Specialized consulting in ERP optimization, business process automation, and Operational Intelligence."
      : "Consultoría especializada en optimización de ERP, automatización de procesos empresariales e Inteligencia Operacional.",
    "sameAs": [
      "https://www.linkedin.com/company/datalytixquest"
    ]
  };
  return (
    <html
      lang={params.lang || 'es'}
      translate="no"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        {props.children}

        {/* Google Analytics 4 */}
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
      </body>
    </html>
  );
}
