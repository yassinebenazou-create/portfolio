import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "next-themes";
import { useThemeColor, ThemeColorProvider } from "@/hooks/use-theme-color";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import VantaBackground from "@/components/VantaBackground";
import StarsCanvas from "@/components/StarBackground";

const queryClient = new QueryClient();

function AppContent() {
  const { setTheme } = useTheme();
  const { themeColor } = useThemeColor();

  useEffect(() => {
    if (import.meta.env.VITE_THEME_MODE !== 'true') {
      setTheme("dark");
    }
  }, [setTheme]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[100] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      <VantaBackground />
      <StarsCanvas />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/razer" element={<AdminLogin />} />
          <Route path="/razer/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
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
