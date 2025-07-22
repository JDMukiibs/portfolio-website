import { ProfileSidebar } from '@/components/devcard/ProfileSidebar';
import { ProjectShowcase } from '@/components/devcard/ProjectShowcase';
import { ContactForm } from '@/components/devcard/ContactForm';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <main className="container mx-auto max-w-6xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16">
        <div className="lg:col-span-4">
          <ProfileSidebar />
        </div>
        <div className="lg:col-span-8 space-y-16">
          <ProjectShowcase />
          <Separator className="my-12" />
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
