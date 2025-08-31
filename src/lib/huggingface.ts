import { InferenceClient } from "@huggingface/inference";

if (!process.env.HUGGINGFACE_API_KEY) {
  throw new Error("Missing HUGGINGFACE_API_KEY in .env file");
}

export const hf = new InferenceClient(process.env.HUGGINGFACE_API_KEY);
