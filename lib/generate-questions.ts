import "server-only";

import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import z from "zod";

const generatedQuestionsSchema = z.object({
  questions: z.array(z.string()),
  isValidJobTitle: z.boolean(),
});

export class InvalidJobTitleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidJobTitleError";
  }
}

export async function generateInterviewQuestions(jobTitle: string) {
  const cleanTitle = jobTitle.trim();

  if (!cleanTitle || cleanTitle.length < 3) {
    throw new InvalidJobTitleError("Please provide a job title.");
  }

  const { output } = await generateText({
    model: google("gemini-3-flash-preview"),
    system: `
      You are an expert technical recruiter hiring top-tier talent.
      Your job is to evaluate if an input string is a plausible real-world job title.
      If it is a real job title, generate 3 insightful and challenging interview questions specific to the role.
      Questions should:
      - assess real-world experience
      - be open-ended
      - avoid yes/no answers
      - be specific to the role
      - be challenging but fair
      If it is not a real job title, return an empty questions array and set isValidJobTitle to false.
    `,
    prompt: `Evaluate the following input: ${cleanTitle}`,
    output: Output.object({
      schema: generatedQuestionsSchema,
    }),
  });

  if (!output.isValidJobTitle) {
    throw new InvalidJobTitleError("Invalid job title");
  }

  if (output.questions.length !== 3) {
    throw new Error("Expected exactly 3 interview questions for a valid job title.");
  }

  return {
    jobTitle: cleanTitle,
    questions: output.questions,
  };
}