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

      {/* PROJECTS */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="font-semibold text-lg">Project Title</h3>
            <p className="text-gray-600 mt-2">
              Demo project description. You can add real projects here with live
              and GitHub links.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="font-semibold text-lg">Project Title</h3>
            <p className="text-gray-600 mt-2">
              Demo project description. You can add real projects here with live
              and GitHub links.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <Experience></Experience>

      {/* CONTACT */}
      <Contact></Contact>

   <ScrollSpySection></ScrollSpySection>
    
    </div>
  );
}
