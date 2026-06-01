import { lazy, Suspense } from "react";
import Banner from "../Banner/Banner";

const About = lazy(() => import("../About/About"));
const ServicesSection = lazy(() => import("../ServicesSection/ServicesSection"));
const Experience = lazy(() => import("../Experience/Experience"));
const Contact = lazy(() => import("../Contact/Contact"));
const ScrollSpySection = lazy(() => import("../ScrollSpySection/ScrollSpySection"));

const SectionFallback = () => <div className="min-h-24" aria-hidden="true" />;

export default function Home() {
  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans overflow-x-hidden">
      <Banner />
      <Suspense fallback={<SectionFallback />}>
        <About />
        <ServicesSection />
        <Experience />
        <Contact />
        <ScrollSpySection />
      </Suspense>
    </div>
  );
}
