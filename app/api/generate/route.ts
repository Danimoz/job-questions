import {
  generateInterviewQuestions,
  InvalidJobTitleError,
} from "@/lib/generate-questions";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { jobTitle?: unknown };
    const inputJobTitle = typeof body.jobTitle === "string" ? body.jobTitle : "";

    const result = await generateInterviewQuestions(inputJobTitle);

    return Response.json(result);
  } catch (error) {
    if (error instanceof InvalidJobTitleError) {
      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }

    console.error(error);
    return Response.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}