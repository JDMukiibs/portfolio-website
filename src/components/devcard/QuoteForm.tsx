"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContactForm } from "./ContactForm"
import { GetAQuoteForm } from "./GetAQuoteForm"

export function QuoteForm() {
    return (
        <section id="quote">
            <Tabs defaultValue="quote" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="quote">Get a Quote</TabsTrigger>
                    <TabsTrigger value="contact">Get In Touch</TabsTrigger>
                </TabsList>
                <TabsContent value="quote" className="py-8">
                   <GetAQuoteForm />
                </TabsContent>
                <TabsContent value="contact" className="py-8">
                    <h2 className="text-3xl font-headline font-bold mb-8 text-foreground">Get In Touch</h2>
                    <ContactForm />
                </TabsContent>
            </Tabs>
        </section>
    )
}
