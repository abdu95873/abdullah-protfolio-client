import Contact from "../Contact/Contact";
import Experience from "../Experience/Experience";
import Banner from "../Banner/Banner";
import ScrollSpySection from "../ScrollSpySection/ScrollSpySection";
import About from "../About/About";
import ServicesSection from "../ServicesSection/ServicesSection";

export default function App() {
  return (


    
    <div className="bg-white text-gray-900 min-h-screen font-sans">


      <Banner></Banner>

      <About></About>

      {/* SKILLS */}
     <ServicesSection></ServicesSection>

      
      {/* EXPERIENCE */}
      <Experience></Experience>

      {/* CONTACT */}
      <Contact></Contact>

   <ScrollSpySection></ScrollSpySection>
    
    </div>
  );
}
