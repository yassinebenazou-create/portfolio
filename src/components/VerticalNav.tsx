import { useState, useEffect } from "react";
import React from "react";
import { Home, Briefcase, Code, PenTool, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SettingsDialog } from "@/components/SettingsDialog";

const navItems: { title: string; id: string; icon: React.ElementType; url?: string }[] = [
  { title: "Home", id: "home", icon: Home },
  { title: "Projects", id: "projects", icon: Briefcase },
  { title: "Skills", id: "skills", icon: Code },
  { title: "Contact", id: "contact", icon: Mail },
];

export function VerticalNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isTooltipEnabled, setIsTooltipEnabled] = useState(true);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      let currentSection = "home";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string, url?: string) => {
    if (url) {
      window.open(url, "_blank");
      return;
    }
    if (id === "home" && !isHomePage) {
      navigate("/");
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const displayNavItems = isHomePage ? navItems : [{ title: "Home", id: "home", icon: Home }];

  return (
    <TooltipProvider>
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 bg-card/75 backdrop-blur-lg py-4 px-2 rounded-2xl shadow-[0_8px_32px_hsl(0_0%_0%_/_0.15)]">
        {displayNavItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <Tooltip key={item.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scrollToSection(item.id, item.url)}
                  className={`
                    relative h-12 w-12 rounded-xl transition-all duration-300
                    ${isActive
                      ? "bg-muted/60 text-primary"
                      : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <item.icon
                    className={`h-5 w-5 transition-all duration-300 hover:scale-110 ${isActive ? "scale-110 drop-shadow-[0_0_12px_hsl(var(--primary)/0.6)]" : ""
                      }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                {item.title}
              </TooltipContent>
            </Tooltip>
          );
        })}

        {/* Settings */}
        <div className="mt-4 pt-4">
          <Tooltip
            delayDuration={0}
            open={(settingsOpen || !isTooltipEnabled) ? false : undefined}
          >
            <TooltipTrigger asChild>
              <div>
                <SettingsDialog
                  variant="icon"
                  open={settingsOpen}
                  onOpenChange={(open) => {
                    setSettingsOpen(open);
                    if (!open) {
                      setIsTooltipEnabled(false);
                      setTimeout(() => setIsTooltipEnabled(true), 1000);
                    }
                  }}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              Settings
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
