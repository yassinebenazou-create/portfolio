import { useState, useEffect } from "react";
import { Menu, X, Home, User, Briefcase, Code, Mail, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SettingsDialog } from "@/components/SettingsDialog";
import { useHaptics } from "@/hooks/useHaptics";

const navItems = [
  { title: "Home", id: "home", icon: Home },
  { title: "About", id: "about", icon: User },
  { title: "Projects", id: "projects", icon: Briefcase },
  { title: "Skills", id: "skills", icon: Code },
  { title: "Contact", id: "contact", icon: Mail },
  { title: "Settings", id: "settings", icon: Settings },
];

export function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const isHomePage = location.pathname === "/";
  const { trigger: haptic } = useHaptics();

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

  const scrollToSection = (id: string) => {
    haptic("selection");
    if (id === "settings") {
      setSettingsOpen(true);
    } else if (id === "home" && !isHomePage) {
      navigate("/");
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  const displayNavItems = isHomePage ? navItems : [{ title: "Home", id: "home", icon: Home }];

  return (
    <div className="md:hidden fixed top-4 left-4 z-50">
      <Sheet open={open} onOpenChange={(val) => { haptic("medium"); setOpen(val); }}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full glass-card border border-border/50 hover:border-primary hover:bg-primary/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] glass-card border-r border-border/50">
          <SheetHeader>
            <SheetTitle className="text-primary">Navigation</SheetTitle>
          </SheetHeader>
          <nav className="mt-8 space-y-2">
            {displayNavItems.map((item) => {
              const isActive = item.id === "settings" ? false : activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                    ${isActive
                      ? "bg-muted text-primary"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <item.icon className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                  <span className="font-medium">{item.title}</span>
                </button>
              );
            })}
          </nav>

          <SettingsDialog
            variant="text"
            open={settingsOpen}
            onOpenChange={setSettingsOpen}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
