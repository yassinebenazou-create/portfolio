import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowLeft, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { VerticalNav } from "@/components/VerticalNav";
import { BottomNav } from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { useState } from "react";
import { ProjectDetails } from "@/components/ProjectDetails";
import { useProjects } from "@/hooks/useProjects";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { projects, loading, error } = useProjects();

  return (
    <>
      <div className="min-h-screen w-full overflow-x-hidden">
        {/* Desktop navigation - hidden on mobile/tablet */}
        <div className="hidden xl:block">
          <VerticalNav />
        </div>

        {/* Mobile/Tablet navigation - bottom bar */}
        <div className="xl:hidden">
          <BottomNav />
        </div>

        <main className="flex-1">
          <section
            className="py-20 px-4 min-h-screen"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 20%, hsl(var(--background)) 40%, hsl(var(--background)) 85%, transparent 100%)' }}
          >
            <div className="container mx-auto max-w-6xl">
              <Link to="/">
                <Button variant="ghost" className="mb-8">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                All Projects
              </h1>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                A complete collection of my work, from web applications to AI-powered solutions
              </p>

              {loading && (
                <div className="flex items-center justify-center min-h-[400px]">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}

              {error && (
                <div className="text-center text-destructive">
                  <p>Failed to load projects. Please try again later.</p>
                </div>
              )}

              {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <Card
                      key={project.id}
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
                        {project.featured && (
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                            Featured
                          </div>
                        )}
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
                  ))}
                </div>
              )}
            </div>
          </section>
          <Footer />
        </main>
      </div>

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
