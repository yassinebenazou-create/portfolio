import { Heart, Code } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { profile } = useProfile();

  const fullName = profile?.full_name || "Shanto Joseph";
  const role = profile?.role || "Full-Stack Developer";

  return (
    <footer className="py-8 px-4 bg-transparent">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo/Name */}
          <div className="space-y-2">
            <h3 className="text-xl font-pixel glow-text leading-relaxed whitespace-nowrap">{fullName}</h3>
            <p className="text-muted-foreground text-sm">{role}</p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#hero" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
              Skills
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Bottom Row */}
          <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2 whitespace-nowrap">
              © {currentYear} <span className="font-pixel text-xs whitespace-nowrap">{fullName}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
