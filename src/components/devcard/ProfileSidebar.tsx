"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, FileText, Briefcase } from 'lucide-react';
import { SiGithub, SiInstagram } from '@icons-pack/react-simple-icons';
import { Button } from '@/components/ui/button';

export function ProfileSidebar() {
  const bio = "Hey there — I'm Joshua, a full-stack engineer with a deep love for musical theatre. I work across Flutter, React Native, React, and .NET, and the part of the job I like most is owning a feature from sprint planning to production. Currently building NextAria — an AI song recommender for performers.";

  return (
    <aside className="lg:sticky lg:top-12">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-4">
          <Image
            src="/assets/images/profilePhoto.jpg"
            alt="Developer's Photo"
            width={80}
            height={80}
            className="rounded-full"
            data-ai-hint="professional portrait"
          />
          <div>
            <h1 className="text-2xl font-headline font-bold text-foreground">Joshua Daniel Mukiibi</h1>
            <p className="text-sm text-primary">Full-stack engineer · theatre devotee</p>
          </div>
        </div>

        <div>
          <h2 className="font-headline text-lg font-semibold mb-2">Behind the curtain</h2>
          <p className="text-muted-foreground text-sm">{bio}</p>
        </div>
        
        <div className="flex space-x-2">
            <Button variant="outline" size="icon" asChild>
                <Link href="https://www.linkedin.com/in/joshua-d-mukiibi/" aria-label="LinkedIn Profile">
                    <Linkedin className="h-4 w-4" />
                </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
                <Link href="https://github.com/JDMukiibs/" aria-label="GitHub Profile">
                    <SiGithub className="h-4 w-4" />
                </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
                <Link href="https://www.instagram.com/josh_d_mukiibs/" aria-label="Instagram Profile">
                    <SiInstagram className="h-4 w-4" />
                </Link>
            </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Button asChild className="w-full">
              <Link href="/assets/docs/Resume_JoshuaDaniel_Mukiibi.pdf" download>
                  <FileText className="mr-2 h-4 w-4" />
                  Download CV
              </Link>
          </Button>
          <Button asChild className="w-full" variant="secondary">
            <Link href="#quote">
              <Briefcase className="mr-2 h-4 w-4" />
              Get a Quote
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
