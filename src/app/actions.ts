"use server";

import * as z from "zod";
import { Resend } from 'resend';
import { EmailTemplate } from "@/components/email-template";

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL;
const toEmail = process.env.RESEND_TO_EMAIL;

export async function submitContactForm(values: z.infer<typeof contactFormSchema>) {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid form data." };
  }

  if (!fromEmail || !toEmail) {
    console.error('RESEND_FROM_EMAIL or RESEND_TO_EMAIL not set in environment variables');
    return { success: false, message: 'Email configuration error.' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: 'Get In Touch',
      react: EmailTemplate({
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      }),
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
