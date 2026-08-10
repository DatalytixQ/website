import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    description: "Descubre cuanta fricción operativa oculta tu ERP y cómo la Inteligencia Artificial puede recuperar la rentabilidad de tu negocio.",
    url: "https://www.datalytixquest.com",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
