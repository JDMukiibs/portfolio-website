"use server";

import * as z from "zod";
import { Resend } from 'resend';
import { EmailTemplate } from "@/components/email-template";

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

const quoteFormSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  company: z.string().optional(),
  projectType: z.string(),
  budgetRange: z.string(),
  timeline: z.string(),
  platforms: z.array(z.string()),
  numberOfScreens: z.string(),
  features: z.array(z.string()).optional(),
  otherFeatures: z.string().optional(),
  projectDescription: z.string().optional(),
});

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL;
const toEmail = process.env.RESEND_TO_EMAIL;

async function sendEmail(subject: string, react: React.ReactElement) {
  if (!fromEmail || !toEmail) {
    console.error('RESEND_FROM_EMAIL or RESEND_TO_EMAIL not set in environment variables');
    return { success: false, message: 'Email configuration error.' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      react,
    });

    if (error) {
      throw error;
    }

    console.log("Email sent successfully:", data);
    return { success: true, message: "Form submitted successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Form submission failed!" };
  }
}

export async function submitContactForm(values: z.infer<typeof contactFormSchema>) {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid form data." };
  }

  return sendEmail(
    'New Contact Form Submission',
    EmailTemplate({
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
    })
  )
}

export async function submitQuoteForm(values: z.infer<typeof quoteFormSchema>) {
    const parsed = quoteFormSchema.safeParse(values);

    if (!parsed.success) {
        return { success: false, message: "Invalid form data." };
    }

    // This is a simplified example. In a real app, you'd generate a quote based on the form values.
    const quoteDetails = `
        Full Name: ${parsed.data.fullName}
        Email: ${parsed.data.email}
        Company: ${parsed.data.company || 'N/A'}
        Project Type: ${parsed.data.projectType}
        Budget Range: ${parsed.data.budgetRange}
        Timeline: ${parsed.data.timeline}
        Platforms: ${parsed.data.platforms.join(', ')}
        Number of Screens: ${parsed.data.numberOfScreens}
        Features: ${parsed.data.features?.join(', ') || 'N/A'}
        Other Features: ${parsed.data.otherFeatures || 'N/A'}
        Project Description: ${parsed.data.projectDescription || 'N/A'}
    `;

    return sendEmail(
        'New Quote Request',
        EmailTemplate({
            name: parsed.data.fullName,
            email: parsed.data.email,
            message: `A new quote has been requested with the following details:\n\n${quoteDetails}`,
        })
    );
}
