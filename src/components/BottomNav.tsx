import { useState, useEffect, useRef } from "react";
import { Home, Briefcase, Code, PenTool, Mail } from "lucide-react";
import { SettingsDialog } from "@/components/SettingsDialog";
import { useHaptics } from "@/hooks/useHaptics";

const navItems = [
  { title: "Home", id: "home", icon: Home },
  { title: "Projects", id: "projects", icon: Briefcase },
  { title: "Skills", id: "skills", icon: Code },
  { title: "Blog", id: "blog", icon: PenTool, url: "https://blog.shantojoseph.com/" },
  { title: "Contact", id: "contact", icon: Mail },
];

export function BottomNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { trigger: haptic } = useHaptics();

  // Reset hide timer
  const resetTimer = () => {
    setIsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

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
      resetTimer(); // Show nav on scroll
    };

    const handleInteraction = () => {
      resetTimer(); // Show nav on tap/click
    };

    // Initial timer
    resetTimer();

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("click", handleInteraction);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (id: string, url?: string) => {
    haptic("selection");
    if (url) {
      window.open(url, "_blank");
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const activeItem = navItems.find(item => item.id === activeSection);

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-50 xl:hidden transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
        }`}
    >
      <nav className="glass-card border border-border/50 rounded-[2rem] px-6 py-4 shadow-[0_8px_32px_hsl(0_0%_0%_/_0.15)]">
        <div className="flex items-center justify-between gap-2">
          {/* Active section with icon and name */}
          {activeItem && (
            <div className="flex items-center gap-2 bg-muted/60 text-primary px-4 py-2 rounded-full">
              <activeItem.icon className="h-5 w-5 transition-transform duration-300 hover:scale-110" strokeWidth={2.5} />
              <span className="font-medium text-sm">{activeItem.title}</span>
            </div>
          )}

          {/* Other navigation items - icons only */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              if (item.id === activeSection) return null;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id, (item as any).url)}
                  className="p-2.5 rounded-full transition-all duration-300 hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                  aria-label={item.title}
                >
                  <item.icon className="h-5 w-5 transition-transform duration-300 hover:scale-110" strokeWidth={2} />
                </button>
              );
            })}

            {/* Settings Button */}
            <div className="ml-1">
              <SettingsDialog
                variant="icon"
                open={settingsOpen}
                onOpenChange={(val) => {
                  if (val) haptic("light");
                  setSettingsOpen(val);
                }}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

