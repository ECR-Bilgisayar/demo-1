import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HighlightsSection from "@/components/HighlightsSection";
import VenueSection from "@/components/VenueSection";
import AgendaSection from "@/components/AgendaSection";
import FAQSection from "@/components/FAQSection";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <div id="about"><AboutSection /></div>
      <div id="experience"><HighlightsSection /></div>
      <div id="venue"><VenueSection /></div>
      <div id="agenda"><AgendaSection /></div>
      <div id="faq"><FAQSection /></div>
      <RegistrationSection />
      <Footer />
    </div>
  );
};

export default Index;
