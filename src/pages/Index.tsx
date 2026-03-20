import { VerticalNav } from "@/components/VerticalNav";
import { BottomNav } from "@/components/BottomNav";
import { BackToTop } from "@/components/BackToTop";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="hidden xl:block">
        <VerticalNav />
      </div>
      <div className="xl:hidden">
        <BottomNav />
      </div>

      <main className="flex-1">
        <ErrorBoundary><Hero /></ErrorBoundary>
        <ErrorBoundary><About /></ErrorBoundary>
        <ErrorBoundary><Projects /></ErrorBoundary>
        <ErrorBoundary><Skills /></ErrorBoundary>
        <ErrorBoundary><Contact /></ErrorBoundary>
        <Footer />
      </main>

      <BackToTop />
    </div>
  );
};

export default Index;
