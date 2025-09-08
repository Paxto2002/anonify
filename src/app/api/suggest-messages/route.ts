// src/app/api/suggest-messages/route.ts
import { hf } from "@/lib/huggingface";
import { NextResponse } from "next/server";
import { z } from "zod";

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
      "Generate 3 diverse, engaging responses to this message:",
      "Create 3 unique, friendly replies for:",
      "Suggest 3 different ways to respond to:",
      "Craft 3 distinct, polite answers for this message:"
    ];
    
    const randomPrompt = randomVariations[Math.floor(Math.random() * randomVariations.length)];
    const randomSeed = Math.floor(Math.random() * 10000);

    const prompt = `
${randomPrompt} "${message}"

IMPORTANT:
- Make each suggestion completely different in tone and content
- Avoid generic phrases like "That's interesting" or "Thanks for sharing"
- Be specific to the message content when possible
- Keep responses between 1-2 sentences
- Format exactly as: suggestion1||suggestion2||suggestion3
- Random variation: ${randomSeed}
`;

    const response = await hf.textGeneration({
      model: "google/gemma-2-2b-it",
      inputs: prompt,
      parameters: { 
        max_new_tokens: 150,
        temperature: 0.9, // Higher for more randomness
        top_p: 0.95, // Broader token selection
        top_k: 50, // Consider more options
        repetition_penalty: 1.2, // Actively discourage repetition
        do_sample: true, // Ensure sampling is enabled
        return_full_text: false,
      },
    });

    // Extract and clean the suggestions
    const generatedText = response.generated_text.trim();
    
    // More robust parsing with multiple fallback strategies
    let suggestions = generatedText
      .split('||')
      .map(s => s.trim()
        .replace(/^["']|["']$/g, '') // Remove quotes
        .replace(/^\d+[\.\)]\s*/, '') // Remove numbering like "1. ", "2) "
        .replace(/^-\s*/, '') // Remove bullet points
        .replace(/suggestion\s*\d+\s*:/i, '') // Remove "suggestion 1:" labels
        .trim()
      )
      .filter(s => s.length > 5 && 
                  !s.toLowerCase().includes('format') &&
                  !s.toLowerCase().includes('suggestion') &&
                  !s.toLowerCase().includes('response') &&
                  !s.toLowerCase().includes('here are')
      )
      .slice(0, 3);

    // If we don't get 3 good suggestions, generate contextual fallbacks
    if (suggestions.length < 3) {
      const messageKeywords = message.split(/\s+/).slice(0, 3).join(' ');
      
      const fallbacks = [
        `I've been thinking about ${messageKeywords} too. What's your perspective?`,
        `That point about ${messageKeywords} really resonates. Could you elaborate?`,
        `Your message about ${messageKeywords} made me curious to learn more.`,
        `I appreciate your thoughts on ${messageKeywords}. What else should I know?`,
        `${messageKeywords} is something I've been considering lately. Tell me more!`,
        `Your perspective on ${messageKeywords} is unique. I'd love to hear more.`
      ];
      
      // Shuffle and take unique fallbacks
      const shuffled = [...fallbacks].sort(() => Math.random() - 0.5);
      suggestions = [...suggestions, ...shuffled.slice(0, 3 - suggestions.length)];
    }

    // Ensure uniqueness
    const uniqueSuggestions = Array.from(new Set(suggestions));
    while (uniqueSuggestions.length < 3) {
      uniqueSuggestions.push(`I'd love to continue our conversation about "${message.substring(0, 30)}..."`);
    }

    return new Response(uniqueSuggestions.join('||'), {
      headers: { 
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'CDN-Cache-Control': 'no-cache',
        'Vary': 'Content-Type, Authorization', // Prevent edge caching
      },
    });

  } catch (err: unknown) {
    console.error("API call failed:", err);
    
    // Get the original message from the request to create contextual fallbacks
    let originalMessage = "this";
    try {
      const body = await req.json();
      const parsed = RequestSchema.safeParse(body);
      if (parsed.success) {
        originalMessage = parsed.data.message.split(/\s+/).slice(0, 2).join(' ');
      }
    } catch (e) {
      // If we can't parse the request, use a generic fallback
    }
    
    // Contextual fallback based on message content
    const fallbacks = [
      `I find ${originalMessage} really fascinating. Could you tell me more?`,
      `Your perspective on ${originalMessage} is interesting. What inspired that?`,
      `Thanks for sharing about ${originalMessage}. I'd love to hear more details.`
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