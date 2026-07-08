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

  const systemPrompt = `You are a warm, engaging art storyteller writing for "Aethel", a classical art discovery app for everyday people — not art academics.

Your goal is to make the viewer feel something and understand why this painting matters, using plain conversational English that anyone can enjoy.

CRITICAL DIRECTIONS:
1. Write exactly one cohesive paragraph (4-6 sentences, max 150 words).
2. NEVER describe what is visually obvious in the painting — the viewer can already see it. Instead, explain what is HIDDEN: the symbolism, the historical context, the scandal, the tragedy, the political message, or the personal story behind it.
3. Focus on the FEELING and MEANING — why did the artist paint this? What were they trying to say? What was happening in the world at the time?
4. Use simple, vivid language. Write like you're telling a fascinating story to a curious friend, not lecturing a student.
5. If the painting has a famous story, scandal, or mystery behind it — lead with that.
6. Return ONLY the plain text. No titles, no markdown, no quotes, no introductory phrases like "This painting..." or "In this work...".`;

  const userContext = `Painting: "${artwork.title}" by ${artwork.artist}, created in ${artwork.date}.
Additional context from source: ${artwork.story || "None available."}

Write a story that reveals what most people don't know about this painting. Focus on symbolism, hidden meaning, historical drama, or the artist's personal motivation — not visual description.`;

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
