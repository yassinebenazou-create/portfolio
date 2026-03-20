import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronLeft, ChevronRight, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { ProjectDetails } from "@/components/ProjectDetails";
import { useProjects } from "@/hooks/useProjects";

import { Project } from "@/hooks/useProjects";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects, loading, error } = useProjects();

  const featuredProjects = projects.filter(project => project.featured);

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-destructive">
            <p>Failed to load projects. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="projects" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center Welcome-text">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A showcase of my recent work, from web applications to AI-powered solutions
          </p>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {featuredProjects.map((project, index) => (
                <CarouselItem key={project.title} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card
                    className="glass-card border-border/50 overflow-hidden group hover:shadow-2xl transition-all duration-300 animate-fade-in h-full flex flex-col"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60"></div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col flex-1">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          asChild
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={() => setSelectedProject(project)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        {project.live && (
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1"
                            asChild
                          >
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>

          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg" className="group" asChild>
              <Link to="/projects">
                View All Projects
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          open={!!selectedProject}
          onOpenChange={(open) => !open && setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default Projects;
