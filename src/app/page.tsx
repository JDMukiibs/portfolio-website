import { ProfileSidebar } from '@/components/devcard/ProfileSidebar';
import { ProjectShowcase } from '@/components/devcard/ProjectShowcase';
import { QuoteForm } from '@/components/devcard/QuoteForm';
import { Separator } from '@/components/ui/separator';
import { SpotlightHero } from '@/components/devcard/SpotlightHero';

export default function Home() {
  return (
    <main className="container mx-auto max-w-6xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16">
        <div className="lg:col-span-4">
          <SpotlightHero>
            <ProfileSidebar />
          </SpotlightHero>
        </div>
        <div className="lg:col-span-8 space-y-16">
          <ProjectShowcase />
          <Separator className="my-12" />
          <QuoteForm />
        </div>
      </div>
    </main>
  );
}
