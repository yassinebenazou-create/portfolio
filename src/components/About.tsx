import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

const RESUME_URL = "https://rxresu.me/shantojoseph23/resume";

const About = () => {
  const { profile } = useProfile();

  const fullName = profile?.full_name || "Shanto Joseph";
  const resumeUrl = profile?.resume_url || RESUME_URL;
  const bio = profile?.bio || "I'm a developer who bridges creativity and engineering. I love building interactive, high-performance web applications using React, Python, Java, and modern AI/ML tools.";

  return (
    <section
      id="about"
      className="py-20 px-4 bg-background [mask-image:linear-gradient(to_bottom,transparent,black_100px)]"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center Welcome-text">
          About Me
        </h2>
        <div className="animate-fade-in text-center md:text-left">
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed text-justify hyphens-auto">
            I'm <span className="text-foreground font-semibold font-pixel whitespace-nowrap text-base sm:text-lg">{fullName}</span>. {bio}
          </p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-justify hyphens-auto">
            My focus is on delivering beautiful, responsive designs and robust, scalable backend systems that bring ideas to life.
            Whether it's crafting intuitive UIs or architecting complex APIs, I turn code into experiences that matter.
          </p>

          <div className="flex justify-center mt-8">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 transition-all duration-300 hover:scale-105"
            >
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-5 w-5" />
                View Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
