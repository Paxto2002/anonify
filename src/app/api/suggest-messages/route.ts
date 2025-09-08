// src/app/api/suggest-messages/route.ts
import { hf } from "@/lib/huggingface";
import { NextResponse } from "next/server";
import { z } from "zod";
import type { TextGenerationStreamOutput } from "@huggingface/inference";

export const runtime = "edge";

// 🔹 Zod schema for request body
const RequestSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

/**
 * Converts a Hugging Face async generator to a ReadableStream
 */
async function convertGeneratorToReadableStream(
  generator: AsyncGenerator<TextGenerationStreamOutput>
) {
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of generator) {
          // chunk.generated_text is string | null
          const text = chunk.generated_text ?? "";
          const encoder = new TextEncoder();
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("HF streaming error:", err.message);
        } else {
          console.error("HF streaming unknown error:", err);
        }
        controller.error(err);
      }
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      // ✅ SafeParseError has .error.issues not .errors
      const firstError = parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { message } = parsed.data;

    const prompt = `
You are a friendly and creative AI assistant for an anonymous social messaging platform like Anonify.
Your task is to generate three short, polite, and open-ended replies that a user could send in response to the following message:
"${message}"

Requirements:
- Replies must be positive, supportive, and engaging.
- Avoid personal, sensitive, controversial, or potentially harmful topics.
- Each reply should encourage further conversation.
- Keep replies short and concise (1-2 sentences each).
- Use a casual, friendly, and approachable tone suitable for anonymous interactions.
- Format the output as a single string, separated by '||'.

Example output:
"That's interesting, can you tell me more?||I really like your point, what else do you think?||Thanks for sharing, I enjoyed reading this!"
`;

    // 🔹 Switch to Zephyr-7B-β
    const generator = hf.textGenerationStream({
      model: "HuggingFaceH4/zephyr-7b-beta",
      inputs: prompt,
      parameters: { max_new_tokens: 150, temperature: 0.7, top_p: 0.95 },
    });

    const stream = await convertGeneratorToReadableStream(generator);

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err: unknown) {
    let name = "HFError";
    let status = 500;
    let headers: Record<string, string> = {};
    let message = "Failed to fetch suggestions";

    if (err instanceof Error) {
      name = err.name || name;
      message = err.message || message;
    } else if (typeof err === "object" && err !== null) {
      const e = err as {
        name?: string;
        status?: number;
        headers?: Record<string, string>;
        message?: string;
      };
      if (e.name) name = e.name;
      if (e.status) status = e.status;
      if (e.headers) headers = e.headers;
      if (e.message) message = e.message;
    }

    console.error("HF API call failed:", err);

    return NextResponse.json({ name, status, headers, message }, { status });
  }
}
