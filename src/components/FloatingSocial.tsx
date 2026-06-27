import { Github, Linkedin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useProfile } from "@/hooks/useProfile";

const FloatingSocial = () => {
  const { profile } = useProfile();

  const socials = [
    {
      icon: Github,
      label: "GitHub",
      href: profile?.github || "https://github.com/yassinebenazzou",
      available: !!(profile?.github || true)
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: profile?.linkedin || "https://www.linkedin.com/in/yassinebenazzou",
      available: !!(profile?.linkedin || true)
    },
    {
      icon: Globe,
      label: "Website",
      href: "#",
      available: false
    }
  ];

  return (
    <TooltipProvider>
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 animate-fade-in hidden md:block">
        <div className="bg-card border-border/20 rounded-l-lg p-2 flex flex-col gap-3 shadow-lg">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <Tooltip key={social.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 rounded-md hover:bg-primary/20 hover:text-primary transition-all duration-300 relative"
                    asChild={social.available}
                    disabled={!social.available}
                  >
                    {social.available ? (
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <Icon className="w-4 h-4" />
                      </a>
                    ) : (
                      <div className="relative">
                        <Icon className="w-4 h-4 opacity-50" />
                        <span className="absolute -top-1 -right-1 text-[10px] bg-muted-foreground/20 px-1 rounded">
                          Soon
                        </span>
                      </div>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{social.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default FloatingSocial;
