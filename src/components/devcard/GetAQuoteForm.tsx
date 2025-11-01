"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { submitQuoteForm } from "@/app/actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const platforms = [
  { id: "web", label: "Web" },
  { id: "ios", label: "iOS" },
  { id: "android", label: "Android" },
  { id: "windows", label: "Windows" },
  { id: "macos", label: "macOS" },
  { id: "linux", label: "Linux" },
] as const;

const features = [
    { id: "userAuthentication", label: "User Authentication" },
    { id: "paymentIntegration", label: "Payment Integration" },
    { id: "databaseDesign", label: "Database Design" },
    { id: "uiAnimations", label: "UI Animations" },
    { id: "apiDevelopment", label: "API Development" },
    { id: "responsiveDesign", label: "Responsive Design" },
    { id: "analyticsIntegration", label: "Analytics Integration" },
    { id: "realTimeFeatures", label: "Real-time Features" },
    { id: "thirdPartyIntegrations", label: "Third-party Integrations" },
    { id: "pushNotifications", label: "Push Notifications" },
    { id: "locationServices", label: "Location Services" },
] as const;

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email(),
  company: z.string().optional(),
  projectType: z.string().min(1, { message: "Please select a project type." }),
  budgetRange: z.string().min(1, { message: "Please select a budget range." }),
  timeline: z.string().min(1, { message: "Please select a timeline." }),
  platforms: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one platform.",
  }),
  numberOfScreens: z.string().min(1, { message: "Please select the number of screens." }),
  features: z.array(z.string()).optional(),
  otherFeatures: z.string().optional(),
  projectDescription: z.string().optional(),
});

export function GetAQuoteForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      projectType: "",
      budgetRange: "",
      timeline: "",
      platforms: [],
      numberOfScreens: "",
      features: [],
      otherFeatures: "",
      projectDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await submitQuoteForm(values);
      if (result.success) {
        toast({
          title: "Quote Request Sent!",
          description: "Thanks for reaching out. I'll get back to you with an estimate soon.",
        });
        form.reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="quote-form">
        <div className="mb-8">
            <h3 className="text-2xl font-headline font-bold">Explore your best option, commitment-free.</h3>
            <p className="text-muted-foreground">I'll contact you via email with an approximate estimate based on your project details. The more information you share, the more accurate the quote will be. This is completely free and doesn't bind us in any way - it's just to help you find the best services for your needs.</p>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
                <h4 className="font-headline text-lg font-semibold">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl><Input placeholder="your.email@example.com" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="company" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Company (Optional)</FormLabel>
                        <FormControl><Input placeholder="Your Company" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            <div className="space-y-4">
                <h4 className="font-headline text-lg font-semibold">Project Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="projectType" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Type *</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="new-app">New Application</SelectItem>
                                    <SelectItem value="existing-app">Existing Application</SelectItem>
                                    <SelectItem value="feature-addition">Feature Addition</SelectItem>
                                    <SelectItem value="consultation">Consultation</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="budgetRange" render={({ field }) => (
                         <FormItem>
                            <FormLabel>Budget Range *</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a range" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="<5k">Under $5,000</SelectItem>
                                    <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                                    <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                                    <SelectItem value="50k+">$50,000+</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="timeline" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Timeline *</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select a timeline" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="<1m">Under 1 Month</SelectItem>
                                    <SelectItem value="1-3m">1-3 Months</SelectItem>
                                    <SelectItem value="3-6m">3-6 Months</SelectItem>
                                    <SelectItem value="6m+">6+ Months</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h4 className="font-headline text-lg font-semibold">Platforms & Screens</h4>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Select all platforms your project will target.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                 <FormField
                    control={form.control}
                    name="platforms"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Select the platforms your app will run on: *</FormLabel>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {platforms.map((platform) => (
                                <FormField
                                    key={platform.id}
                                    control={form.control}
                                    name="platforms"
                                    render={({ field }) => {
                                    return (
                                        <FormItem key={platform.id} className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                checked={field.value?.includes(platform.id)}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                    ? field.onChange([...field.value, platform.id])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                        (value) => value !== platform.id
                                                        )
                                                    )
                                                }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal">{platform.label}</FormLabel>
                                        </FormItem>
                                    )
                                    }}
                                />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField control={form.control} name="numberOfScreens" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Number of Screens *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select number of screens" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="1-5">1-5 Screens</SelectItem>
                                <SelectItem value="6-10">6-10 Screens</SelectItem>
                                <SelectItem value="11-20">11-20 Screens</SelectItem>
                                <SelectItem value="21+">21+ Screens</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            <div className="space-y-4">
                <h4 className="font-headline text-lg font-semibold">Key Features Needed</h4>
                <FormField
                    control={form.control}
                    name="features"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Select the features your project will need (optional):</FormLabel>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {features.map((feature) => (
                                <FormField
                                    key={feature.id}
                                    control={form.control}
                                    name="features"
                                    render={({ field }) => {
                                    return (
                                        <FormItem key={feature.id} className="flex flex-row items-start space-x-3 space-y-0">
                                             <Button
                                                type="button"
                                                variant={field.value?.includes(feature.id) ? "secondary" : "outline"}
                                                onClick={() => {
                                                    const updatedFeatures = field.value?.includes(feature.id)
                                                    ? field.value?.filter((value) => value !== feature.id)
                                                    : [...(field.value || []), feature.id];
                                                    field.onChange(updatedFeatures);
                                                }}
                                                className="rounded-full"
                                                >
                                                {feature.label}
                                             </Button>
                                        </FormItem>
                                    )
                                    }}
                                />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField control={form.control} name="otherFeatures" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Other features (optional)</FormLabel>
                        <FormControl><Input placeholder="e.g. AI Integration, Blockchain" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
            
            <div className="space-y-4">
                <h4 className="font-headline text-lg font-semibold">Project Description</h4>
                 <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tell me about your project (optional)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Describe your project in detail..." {...field} rows={6}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>


          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>) : ("Get my quote")}
          </Button>

           <FormDescription>
            *The more details you input—such as a detailed description, the number of screens, platforms, and features—the more accurate the quote will be in my email response.
          </FormDescription>
        </form>
      </Form>
    </section>
  );
}
