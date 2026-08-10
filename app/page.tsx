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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ApproachSection />
      <AssessmentSection />
      <ValueSection />
      <IndustriesSection />
      <AboutSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
