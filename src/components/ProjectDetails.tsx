import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useState, useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi,
} from "@/components/ui/carousel";

interface ProjectDetailsProps {
    project: {
        id: number;
        title: string;
        description: string;
        image: string;
        images?: string[];
        tech: string[];
        github: string;
        live?: string;
        featured: boolean;
    };
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProjectDetails({ project, open, onOpenChange }: ProjectDetailsProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    // Use images array if available, otherwise use single image
    const projectImages = project.images || [project.image];

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    // Auto-play functionality
    useEffect(() => {
        if (!api || projectImages.length <= 1) {
            return;
        }

        const interval = setInterval(() => {
            if (api.canScrollNext()) {
                api.scrollNext();
            } else {
                api.scrollTo(0);
            }
        }, 5000); // 5 seconds

        return () => clearInterval(interval);
    }, [api, projectImages.length]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                    <DialogDescription className="text-base">
                        {project.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Project Image Carousel */}
                    <div className="relative">
                        <Carousel
                            setApi={setApi}
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent>
                                {projectImages.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                                            <img
                                                src={image}
                                                alt={`${project.title} - Image ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>

                        {/* Dots Navigation */}
                        {projectImages.length > 1 && (
                            <div className="flex justify-center gap-2 mt-4">
                                {projectImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => api?.scrollTo(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${index === current
                                                ? "w-8 bg-primary"
                                                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                            }`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Technologies */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-md font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Project Details */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">About This Project</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                            variant="outline"
                            className="flex-1"
                            asChild
                        >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                View Code
                            </a>
                        </Button>
                        {project.live && (
                            <Button
                                variant="default"
                                className="flex-1"
                                asChild
                            >
                                <a href={project.live} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Live Preview
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
