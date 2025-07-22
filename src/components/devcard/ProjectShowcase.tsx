import { ProjectCard, type Project } from './ProjectCard';

const projects: Project[] = [
  {
    title: "AI-Powered Task Manager",
    description: "A smart task management application that uses AI to prioritize and suggest tasks based on your workflow and deadlines.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "abstract productivity",
    githubUrl: "#",
    tags: ["Next.js", "AI", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "E-commerce Analytics Dashboard",
    description: "A comprehensive dashboard for e-commerce businesses to track sales, customer behavior, and inventory in real-time.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "data dashboard",
    githubUrl: "#",
    tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
  },
  {
    title: "Real-time Collaborative Editor",
    description: "A web-based document editor that allows multiple users to collaborate in real-time, similar to Google Docs.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "collaboration software",
    githubUrl: "#",
    tags: ["WebSockets", "React", "Firebase", "CRDTs"],
  },
  {
    title: "Portfolio Website V2",
    description: "The very portfolio you are browsing, built with a focus on minimalist design, performance, and generative AI features.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "minimalist code",
    githubUrl: "#",
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
