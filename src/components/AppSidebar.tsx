import { useState, useEffect } from "react";
import { Home, User, Briefcase, Code, PenTool, Mail, ChevronRight, ChevronLeft, Sun, Moon } from "lucide-react";
import React from "react";
import { useTheme } from "next-themes";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";

const navItems: { title: string; id: string; icon: React.ElementType; url?: string }[] = [
  { title: "Home", id: "home", icon: Home },
  { title: "About", id: "about", icon: User },
  { title: "Projects", id: "projects", icon: Briefcase },
  { title: "Skills", id: "skills", icon: Code },
  { title: "Contact", id: "contact", icon: Mail },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const { profile } = useProfile();

  const fullName = profile?.full_name || "Yassine Benazzou";

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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar variant="floating" side="left" className="p-4" collapsible="icon">
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border/50 bg-transparent">
        {!isCollapsed && (
          <h1 className="text-xs font-pixel text-foreground leading-relaxed truncate max-w-[120px]" title={fullName}>{fullName}</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 hover:bg-muted/50 transition-all ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <SidebarContent className="mt-2 bg-transparent pb-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:transparent [&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-primary/50">
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => scrollToSection(item.id, item.url)}
                  className={`
                    relative group transition-all duration-300 mx-2 rounded-xl py-3
                    ${isActive
                      ? "bg-primary/20 text-primary hover:bg-primary/25 shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
                      : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                    }
                  `}
                  tooltip={isCollapsed ? item.title : undefined}
                >
                  <item.icon
                    className={`h-[22px] w-[22px] transition-all duration-300 group-hover:scale-110 ${isActive ? "text-primary drop-shadow-[0_0_12px_hsl(var(--primary)/0.6)]" : ""
                      }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {!isCollapsed && <span className="ml-3 font-medium">{item.title}</span>}
                  {isActive && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-glow" />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {import.meta.env.VITE_THEME_MODE === 'true' && (
        <SidebarFooter className="border-t border-sidebar-border/50 bg-transparent p-3">
          <Button
            variant="ghost"
            size={isCollapsed ? "icon" : "default"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full hover:bg-primary/10 transition-all duration-300 rounded-xl py-3 group"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-[22px] w-[22px] transition-transform group-hover:rotate-180 duration-500" strokeWidth={2} />
                {!isCollapsed && <span className="ml-2 font-medium">Light</span>}
              </>
            ) : (
              <>
                <Moon className="h-[22px] w-[22px] transition-transform group-hover:-rotate-45 duration-500" strokeWidth={2} />
                {!isCollapsed && <span className="ml-2 font-medium">Dark</span>}
              </>
            )}
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
