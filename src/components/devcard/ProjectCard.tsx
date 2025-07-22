import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  githubUrl: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="font-headline">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="aspect-video overflow-hidden rounded-md border">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={600}
            height={400}
            className="w-full h-full object-cover"
            data-ai-hint={project.imageHint}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
        </div>
        <Button asChild className="w-full mt-auto" variant="outline">
          <Link href={project.githubUrl}>
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
