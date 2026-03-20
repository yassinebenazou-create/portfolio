import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "next-themes";
import { useThemeColor, ThemeColorProvider } from "@/hooks/use-theme-color";
import { ScrollToTop } from "@/components/ScrollToTop";
import { GooeyToaster } from "goey-toast";
import "goey-toast/styles.css";
import Index from "./pages/Index";

const Projects = lazy(() => import("./pages/Projects"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

import VantaBackground from "@/components/VantaBackground";
import StarsCanvas from "@/components/StarBackground";

// Skip stars on low-end devices (< 4 cores or < 4GB RAM) to avoid double WebGL overhead
const isLowEnd =
  (navigator.hardwareConcurrency ?? 8) < 4 ||
  ((navigator as { deviceMemory?: number }).deviceMemory ?? 8) < 4;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min cache
      retry: 1,
    },
  },
});

function AppContent() {
  const { setTheme } = useTheme();

  useEffect(() => {
    if (import.meta.env.VITE_THEME_MODE !== 'true') {
      setTheme("dark");
    }
  }, [setTheme]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[100] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      <VantaBackground />
      {!isLowEnd && <StarsCanvas />}
      <Toaster />
      <GooeyToaster position="bottom-right" theme="dark" preset="bouncy" />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/razer" element={<AdminLogin />} />
            <Route path="/razer/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ThemeColorProvider>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </ThemeColorProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
