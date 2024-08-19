import { NextResponse } from 'next/server';
import { generateFlashcards } from "../../utils/googleGenAI";

const systemPrompt = `
Generate flashcards from jewelry data stored in Firebase. Each flashcard should focus on enhancing product knowledge with concise and informative questions and answers. Prioritize the following categories when sufficient data is available:

Materials: Include questions about the types of materials used (e.g., gold, silver, gemstones).
Care Instructions: Create flashcards covering the proper care and maintenance of each material.
Styles: Ask about various styles of jewelry (e.g., vintage, modern, bohemian) and their distinguishing characteristics.
History: When possible, include flashcards on the historical or cultural significance of specific pieces or styles.
For each question, ensure the answer is clear, concise, and directly related to the product data.

Return the flashcards in the following JSON format:
{
  "flashcards": [
    {
      "front": "image_url_here",
      "back": "Question: [Insert question here]\nAnswer: [Insert concise and informative answer here]"
    },
    ...
  ]
}
`;



export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { jewelryData } = req.body;

      // Call the function to generate flashcards
      const flashcards = await generateFlashcards(systemPrompt);

      res.status(200).json({ flashcards });
    } catch (error) {
      console.error("Error generating flashcards:", error);
      res.status(500).json({ error: "Failed to generate flashcards" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

