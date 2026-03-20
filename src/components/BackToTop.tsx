import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);

      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const circumference = 2 * Math.PI * 21; // radius = 21
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`
        fixed bottom-32 right-4 z-40
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <div className="relative">
        {/* Circular progress indicator */}
        <svg
          className="absolute -inset-1.5 w-[52px] h-[52px] -rotate-90"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle */}
          <circle
            cx="26"
            cy="26"
            r="21"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="3"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="26"
            cy="26"
            r="21"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-none"
            strokeLinecap="round"
          />
        </svg>

        {/* Button */}
        <Button
          onClick={scrollToTop}
          size="icon"
          className="bg-black hover:bg-black/80 text-primary rounded-full shadow-lg relative"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
