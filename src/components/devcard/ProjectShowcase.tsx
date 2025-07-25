import { ProjectCard, type Project } from './ProjectCard';

const projects: Project[] = [
  {
    title: "NextAria",
    description: "NextAria offers AI-powered, personalized musical theatre song recommendations tailored to your voice and experience, allowing you to easily track learned songs and get instant access without account creation.",
    imageUrl: "/assets/images/next_aria_showcase_photo.png",
    imageHint: "Next Aria Banner",
    githubUrl: "https://github.com/JDMukiibs/next-aria-landing-page",
    tags: ["Flutter", "AI"],
  },
  {
    title: "pokedex cli",
    description: "A text-based Pokedex application, inspired by Pokémon, that implements a read-evaluate-print loop (REPL) allowing users to explore locations, encounter Pokémon, and build their collection.",
    imageUrl: "/assets/images/golang.png",
    imageHint: "run through",
    githubUrl: "https://github.com/JDMukiibs/pokedexcli",
    tags: ["Go"],
  },
  {
    title: "REST-ful BE in Go",
    description: "This Go project involved building a production-ready backend application, implementing scalable APIs, and integrating with PostgreSQL via Docker.",
    imageUrl: "/assets/images/golang.png",
    imageHint: "backend development",
    githubUrl: "https://github.com/JDMukiibs/fem_project",
    tags: ["Go", "PostgreSQL", "Docker"],
  },
  {
    title: "Portfolio Website",
    description: "The very portfolio you are browsing, built with a focus on minimalist design, performance, and with FirebaseStudio as a development environment.",
    imageUrl: "/assets/images/portfolioWordCloud.png",
    imageHint: "minimalist code",
    githubUrl: "https://github.com/JDMukiibs/portfolio-website",
    liveUrl: "/",
    tags: ["Next.js", "Genkit", "Shadcn UI"],
  },
];

export function ProjectShowcase() {
  return (
    <section id="projects">
      <h2 className="text-3xl font-headline font-bold mb-8 text-foreground">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
