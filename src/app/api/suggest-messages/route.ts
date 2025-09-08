// src/app/api/suggest-messages/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { generateWithGemini } from "@/lib/gemini";

export const runtime = "edge";

const RequestSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid input";
      return new Response(firstError, { status: 400 });
    }

    const { message } = parsed.data;

    // Add variation to prevent deterministic outputs
    const randomVariations = [
      "Generate 3 ways to complete this partial message:",
      "Suggest 3 continuations for this message:",
      "Create 3 different ways to finish this thought:",
      "Provide 3 options to complete this message:"
    ];
    
    const randomPrompt = randomVariations[Math.floor(Math.random() * randomVariations.length)];

    const prompt = `
${randomPrompt} "${message}"

IMPORTANT:
- These are COMPLETIONS, not responses to the message
- Continue the thought naturally from where it left off
- Make each completion completely different in tone and content
- Keep completions between 1-2 sentences
- Format exactly as: completion1||completion2||completion3
- Be creative and engaging
- Avoid generic phrases

Examples:
If input is: "I was thinking about"
Good completions: "taking a trip this weekend||starting a new hobby||catching up with old friends"

If input is: "The weather today is"
Good completions: "perfect for a picnic in the park||making me want to stay indoors with a book||reminding me of my childhood summers"
`;

    // Use the Gemini function directly
    const generatedText = await generateWithGemini(prompt);
    
    if (!generatedText) {
      throw new Error("No text generated from Gemini API");
    }

    // Extract and clean the suggestions with proper typing
    let suggestions = generatedText
      .split('||')
      .map((s: string) => s.trim()
        .replace(/^["']|["']$/g, '')
        .replace(/^\d+[\.\)]\s*/, '')
        .replace(/^-\s*/, '')
        .replace(/completion\s*\d+\s*:/i, '')
        .replace(/suggestion\s*\d+\s*:/i, '')
        .trim()
      )
      .filter((s: string) => s.length > 5 && 
                  !s.toLowerCase().includes('format') &&
                  !s.toLowerCase().includes('completion') &&
                  !s.toLowerCase().includes('suggestion') &&
                  !s.toLowerCase().includes('response') &&
                  !s.toLowerCase().includes('here are')
      )
      .slice(0, 3);

    // If we don't get 3 good suggestions, generate contextual fallbacks
    if (suggestions.length < 3) {
      // Create completions that continue the message
      const fallbacks = [
        `and I'd love to hear your thoughts on it.`,
        `so I wanted to share it with you.`,
        `which made me think of you.`,
        `and it's been on my mind all day.`,
        `but I'm not sure how to finish that thought.`,
        `and I'm curious what you think about it.`
      ];
      
      // Shuffle and take unique fallbacks
      const shuffled = [...fallbacks].sort(() => Math.random() - 0.5);
      suggestions = [...suggestions, ...shuffled.slice(0, 3 - suggestions.length)];
    }

    // Ensure uniqueness
    const uniqueSuggestions = Array.from(new Set(suggestions));
    while (uniqueSuggestions.length < 3) {
      uniqueSuggestions.push(`and I've been thinking about it ever since.`);
    }

    return new Response(uniqueSuggestions.join('||'), {
      headers: { 
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (err: unknown) {
    console.error("API call failed:", err);
    
    // Get the original message from the request
    let originalMessage = "this";
    try {
      const body = await req.json();
      const parsed = RequestSchema.safeParse(body);
      if (parsed.success) {
        originalMessage = parsed.data.message;
      }
    } catch (e) {
      // If we can't parse the request, use a generic fallback
    }
    
    // Fallback completions (not responses)
    const fallbacks = [
      `and it's been on my mind lately.`,
      `so I wanted to share it with you.`,
      `and I'd love to know what you think.`
    ];
    
    const fallback = fallbacks.join('||');

    return new Response(fallback, {
      status: 200,
      headers: { 
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
}