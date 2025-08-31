import { hf } from "@/lib/huggingface";
import { NextResponse } from "next/server";

export const runtime = "edge";

/**
 * Converts a Hugging Face async generator to a ReadableStream
 */
async function convertGeneratorToReadableStream(
  generator: AsyncGenerator<any>
) {
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of generator) {
          const text = chunk.generated_text || "";
          const encoder = new TextEncoder();
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      } catch (err: any) {
        console.error("HF streaming error:", err);
        controller.error(err);
      }
    },
  });
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || message.trim() === "") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

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

    // Switch to Zephyr-7B-β
    const generator = hf.textGenerationStream({
      model: "HuggingFaceH4/zephyr-7b-beta",
      inputs: prompt,
      parameters: { max_new_tokens: 150, temperature: 0.7, top_p: 0.95 },
    });

    const stream = await convertGeneratorToReadableStream(generator);

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err: any) {
    const name = err.name || "HFError";
    const status = err.status || 500;
    const headers = err.headers || {};
    const message = err.message || "Failed to fetch suggestions";

    console.error("HF API call failed:", err);

    return NextResponse.json({ name, status, headers, message }, { status });
  }
}
