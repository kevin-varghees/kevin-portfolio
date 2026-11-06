import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Footer } from "./components/Footer";
import { Classroom } from "./components/Classroom";
import { Hackathons } from "./components/Hackathons";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/Motion";
import { Skills } from "./components/Skills";
import { TechStrip } from "./components/TechStrip";
import { startPointer } from "./lib/pointer";

startPointer();

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TechStrip />
        <About />
        <Skills />
        <Hackathons />
        <Classroom />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
