import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import ValueSection from "@/components/sections/ValueSection";
import ApproachSection from "@/components/sections/ApproachSection";
import AssessmentSection from "@/components/sections/AssessmentSection";
import AboutSection from "@/components/sections/AboutSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/sections/Footer";
import { getDictionary } from '@/dictionaries/dictionaries';

export default async function Home(props: { params: Promise<{ lang: 'es' | 'en' }> }) {
  const params = await props.params;
  const lang = params.lang;
  console.log("Page received lang:", lang);
  const dict = await getDictionary(lang)

  return (
    <main className="min-h-screen bg-background">
      <Navbar dict={dict.navbar} lang={lang} />
      <HeroSection dict={dict.hero} />
      <ProblemSection dict={dict.problem} />
      <SolutionSection dict={dict.solution} />
      <ApproachSection dict={dict.approach} />
      <AssessmentSection dict={dict.assessment} />
      <ValueSection dict={dict.value} />
      <IndustriesSection dict={dict.industries} />
      <AboutSection dict={dict.about} />
      <FAQSection dict={dict.faq} />
      <Footer dict={dict.footer} />
    </main>
  );
}
