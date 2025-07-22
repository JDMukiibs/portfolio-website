"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Instagram, Globe, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { personalizeIntroText } from '@/ai/flows/personalize-intro-text';

export function ProfileSidebar() {
  const [intro, setIntro] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would get this data from a user's session or profile.
    const visitorProfileData = "A frontend developer from Google visiting the portfolio of a full-stack developer specializing in Next.js and AI.";
    
    personalizeIntroText({ visitorProfileData })
      .then(response => {
        setIntro(response.personalizedText);
      })
      .catch(error => {
        console.error("Failed to generate personalized intro:", error);
        setIntro("Full-stack developer with a passion for building modern web applications and exploring the potential of AI.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
            <h1 className="text-2xl font-headline font-bold text-foreground">Alex Doe</h1>
            <p className="text-sm text-primary">Full-Stack Developer</p>
          </div>
        </div>

        <div>
          <h2 className="font-headline text-lg font-semibold mb-2">About Me</h2>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">{intro}</p>
          )}
        </div>
        
        <div className="flex space-x-2">
            <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn Profile">
                    <Linkedin className="h-4 w-4" />
                </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="GitHub Profile">
                    <Github className="h-4 w-4" />
                </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="Instagram Profile">
                    <Instagram className="h-4 w-4" />
                </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="Personal Blog">
                    <Globe className="h-4 w-4" />
                </Link>
            </Button>
        </div>

        <Link href="/cv.pdf" download="AlexDoe-CV.pdf" passHref legacyBehavior>
            <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Download CV
            </Button>
        </Link>
      </div>
    </aside>
  );
}
