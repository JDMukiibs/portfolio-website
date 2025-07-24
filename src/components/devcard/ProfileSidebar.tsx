"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Globe, FileText } from 'lucide-react';
import { SiGithub, SiInstagram } from '@icons-pack/react-simple-icons';
import { Button } from '@/components/ui/button';

export function ProfileSidebar() {
  const bio = "Hey there! I'm Joshua Daniel Mukiibi, a Full-Stack Software Engineer specializing in building robust and intuitive applications. With a passion for crafting impactful user experiences and powerful backend systems, I've honed my skills across Flutter, React Native, React, and .NET Core. I excel at architecting scalable solutions, implementing secure authentication flows, and leading agile development processes from sprint planning to deployment via Azure DevOps. My ongoing exploration into Go, coupled with side projects, further showcases my commitment to continuous learning. You might find my current work on Next Aria, an AI-powered musical theatre song recommender, particularly interesting. I'm always eager to explore new challenges and collaborate on exciting projects!";

  return (
    <aside className="lg:sticky lg:top-12">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-4">
          <Image
            src="https://placehold.co/80x80.png"
            alt="Developer's Photo"
            width={80}
            height={80}
            className="rounded-full"
            data-ai-hint="professional portrait"
          />
          <div>
            <h1 className="text-2xl font-headline font-bold text-foreground">Joshua Daniel Mukiibi</h1>
            <p className="text-sm text-primary">Full-Stack Developer</p>
          </div>
        </div>

        <div>
          <h2 className="font-headline text-lg font-semibold mb-2">About Me</h2>
          <p className="text-muted-foreground text-sm">{bio}</p>
        </div>
        
        <div className="flex space-x-2">
            <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn Profile">
                    <Linkedin className="h-4 w-4" />
                </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="GitHub Profile">
                    <SiGithub className="h-4 w-4" />
                </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="Instagram Profile">
                    <SiInstagram className="h-4 w-4" />
                </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="Personal Blog">
                    <Globe className="h-4 w-4" />
                </Link>
            </Button>
        </div>

        <Button asChild className="w-full">
            <Link href="/cv.pdf" download="JoshuaDanielMukiibi-CV.pdf">
                <FileText className="mr-2 h-4 w-4" />
                Download CV
            </Link>
        </Button>
      </div>
    </aside>
  );
}
