import Constants from "expo-constants";
import { Artwork } from "../types";

const GROQ_API_KEY = Constants.expoConfig?.extra?.groqApiKey || "";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function generateArtStory(artwork: Artwork): Promise<string> {
  if (!GROQ_API_KEY) {
    console.warn(
      "Groq API Key missing! Returning default fallback description.",
    );
    return "A beautiful masterpiece waiting for its story to be told.";
  }

  const systemPrompt = `You are an elegant, engaging art historian writing for "Aethel", a classical art discovery app. 
Your goal is to provide passive, ambient art education through a compelling, human-readable blog-style story about the provided painting.
CRITICAL DIRECTIONS:
1. Write exactly one cohesive paragraph (around 4-6 sentences, max 150 words).
2. Blend historical facts with atmospheric, narrative storytelling.
3. Keep the tone warm, intellectual, and narrative—not a dry list of facts.
4. Return ONLY the plain text of the story. Do NOT include titles, markdown headings, quotes, or introductory fluff.`;

  const userContext = `Title: ${artwork.title}
Artist: ${artwork.artist}
Date: ${artwork.date}
Existing Metadata/Context: ${artwork.story || "No description available."}`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContext },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const cleanStory = data.choices[0]?.message?.content?.trim();

    return cleanStory || "Failed to generate a narrative for this piece.";
  } catch (error) {
    console.error("Error generating story from Groq:", error);
    return artwork.story || "An incredible public domain work of art.";
  }
}
