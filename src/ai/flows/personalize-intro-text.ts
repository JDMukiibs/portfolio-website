'use server';

/**
 * @fileOverview A flow that personalizes the introductory text based on visitor profile data.
 *
 * - personalizeIntroText - A function that handles the personalization process.
 * - PersonalizeIntroTextInput - The input type for the personalizeIntroText function.
 * - PersonalizeIntroTextOutput - The return type for the personalizeIntroText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeIntroTextInputSchema = z.object({
  visitorProfileData: z
    .string()
    .describe(
      'Publicly available profile data of the visitor, such as from LinkedIn.'
    ),
});
export type PersonalizeIntroTextInput = z.infer<
  typeof PersonalizeIntroTextInputSchema
>;

const PersonalizeIntroTextOutputSchema = z.object({
  personalizedText: z
    .string()
    .describe('The personalized introductory text for the visitor.'),
});
export type PersonalizeIntroTextOutput = z.infer<
  typeof PersonalizeIntroTextOutputSchema
>;

export async function personalizeIntroText(
  input: PersonalizeIntroTextInput
): Promise<PersonalizeIntroTextOutput> {
  return personalizeIntroTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeIntroTextPrompt',
  input: {schema: PersonalizeIntroTextInputSchema},
  output: {schema: PersonalizeIntroTextOutputSchema},
  prompt: `You are an AI assistant specializing in creating personalized introductory texts for developer portfolios.

  Based on the visitor's profile data, craft a short and engaging introductory text that highlights relevant skills and experiences.

  Visitor Profile Data: {{{visitorProfileData}}}
  `,
});

const personalizeIntroTextFlow = ai.defineFlow(
  {
    name: 'personalizeIntroTextFlow',
    inputSchema: PersonalizeIntroTextInputSchema,
    outputSchema: PersonalizeIntroTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
