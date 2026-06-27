import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ChevronDown, Copy, Check } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { gooeyToast } from "goey-toast";
import StarBorder from "@/components/ui/star-border";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromTop, slideInFromRight } from "@/lib/motion";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useProfile } from "@/hooks/useProfile";
import { DEFAULT_PROFILE } from "@/lib/config";

const Hero = () => {
  const [isEmailSheetOpen, setIsEmailSheetOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { profile } = useProfile();
  const { themeColor } = useThemeColor();

  const fullName = (profile?.full_name?.trim() || DEFAULT_PROFILE.full_name).trim();
  const nameParts = fullName.split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] || DEFAULT_PROFILE.first_name;
  const lastName = nameParts.slice(1).join(" ") || DEFAULT_PROFILE.last_name;
  const role = profile?.role?.trim() || DEFAULT_PROFILE.role;
  const bio = profile?.bio?.trim() || DEFAULT_PROFILE.bio;
  const email = profile?.email || DEFAULT_PROFILE.email;
  const github = profile?.github || DEFAULT_PROFILE.github;
  const linkedin = profile?.linkedin || DEFAULT_PROFILE.linkedin;

  const colorMap = {
    green: "hsl(120, 61%, 34%)",
    blue: "hsl(210, 100%, 45%)",
    purple: "hsl(270, 70%, 45%)",
    orange: "hsl(30, 100%, 45%)",
    pink: "hsl(330, 70%, 50%)",
    red: "hsl(0, 72%, 51%)",
  };
  const starColor = colorMap[themeColor] || "cyan";

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      gooeyToast.success("Email copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      gooeyToast.error("Failed to copy email");
    }
  };

  return (
    <section
      id="home"
      className="relative flex flex-col h-screen w-full overflow-hidden"
    >
      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 md:px-20 z-20 flex flex-col md:flex-row items-center justify-center md:justify-between h-full gap-8 mt-16 md:mt-0"
      >
        <div className="flex flex-col gap-6 text-center md:text-start items-center md:items-start max-w-2xl w-full">
          <motion.h1
            variants={slideInFromLeft(0.5)}
            className="text-4xl md:text-6xl font-bold text-foreground mb-2 leading-tight font-pixel transition-colors duration-500"
          >
            <span className="Welcome-text">{firstName}</span>{" "}
            <span className="text-primary">{lastName}</span>
          </motion.h1>

          <motion.p
            variants={slideInFromLeft(0.6)}
            className="text-lg md:text-xl text-muted-foreground"
          >
            <span className="Welcome-text">{role}</span>
          </motion.p>

          <motion.p
            variants={slideInFromLeft(1)}
            className="text-lg md:text-xl text-muted-foreground/80 mb-8 max-w-xl"
          >
            {bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={slideInFromLeft(1.2)}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-16 items-center"
          >
            <Button
              variant="hero"
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="px-8"
            >
              View My Work
            </Button>
            <StarBorder
              as="button"
              className="rounded-md"
              innerClassName="py-[10px] px-8 text-sm rounded-md"
              color={starColor}
              speed="5s"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </StarBorder>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={slideInFromLeft(1.4)}
            className="flex gap-6 mb-16"
          >
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Github className="w-7 h-7" />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Linkedin className="w-7 h-7" />
            </a>
            <button
              onClick={() => setIsEmailSheetOpen(true)}
              aria-label="Open email contact"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Mail className="w-7 h-7" />
            </button>
          </motion.div>
        </div>

        {/* Hero Illustration */}
        <motion.div
          variants={slideInFromRight(0.8)}
          className="hidden md:flex justify-center items-center w-full max-w-[600px]"
        >
          <img
            src="/hero-bg.svg"
            alt="Hero background"
            className="select-none pointer-events-none w-full h-auto animate-float"
            style={{ willChange: "transform" }}
            fetchPriority="high"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-float"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="w-8 h-8" />
      </button>

      {/* Email Sheet */}
      <Sheet open={isEmailSheetOpen} onOpenChange={setIsEmailSheetOpen}>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Get in Touch</SheetTitle>
            <SheetDescription>
              Feel free to reach out via email
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{email}</span>
            </div>
            <Button
              onClick={handleCopy}
              className="w-full"
              variant="outline"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Email
                </>
              )}
            </Button>
            <Button
              className="w-full"
              variant="default"
              onClick={() => {
                setIsEmailSheetOpen(false);
                scrollToSection("contact");
              }}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Hero;
