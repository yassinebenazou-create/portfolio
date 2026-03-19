import { VerticalNav } from "@/components/VerticalNav";
import { BottomNav } from "@/components/BottomNav";
import { BackToTop } from "@/components/BackToTop";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Desktop navigation - hidden on mobile/tablet */}
      <div className="hidden xl:block">
        <VerticalNav />
      </div>

      {/* Mobile/Tablet navigation - bottom bar */}
      <div className="xl:hidden">
        <BottomNav />
      </div>

      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>

      <BackToTop />
    </div>
  );
};

export default Index;
