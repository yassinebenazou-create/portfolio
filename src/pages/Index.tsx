import { lazy, Suspense } from "react";
import { VerticalNav } from "@/components/VerticalNav";
import { BottomNav } from "@/components/BottomNav";
import { BackToTop } from "@/components/BackToTop";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { usePageMeta } from "@/hooks/usePageMeta";
import { SITE } from "@/lib/config";

const About = lazy(() => import("@/components/About"));
const Projects = lazy(() => import("@/components/Projects"));
const Skills = lazy(() => import("@/components/Skills"));
const Contact = lazy(() => import("@/components/Contact"));

const Index = () => {
  usePageMeta({
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
  });
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
        <Suspense fallback={<div className="h-32" />}>
          <ErrorBoundary><About /></ErrorBoundary>
          <ErrorBoundary><Projects /></ErrorBoundary>
          <ErrorBoundary><Skills /></ErrorBoundary>
          <ErrorBoundary><Contact /></ErrorBoundary>
        </Suspense>
        <Footer />
      </main>

      <BackToTop />
    </div>
  );
};

export default Index;
