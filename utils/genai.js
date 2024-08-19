import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
});

const getModel = async () => {
  try {
    const model = await genAI.getGenerativeModel({
      model: 'models/gemini-pro-1', // Ensure the correct model name is used (replace with your desired model)
    });
    return model;
  } catch (error) {
    console.error('Error initializing Gemini model:', error);
    throw error; // Or handle error appropriately
  }
};

export async function generateFlashcards(prompt) {
  try {
    const response = await genAI.generateText({
      model: 'models/gemini-pro-1', // Ensure you're using the correct model
      prompt: prompt,               // The system prompt or custom prompt for flashcards generation
      temperature: 0.7,             // Control randomness (adjust this based on your need)
      maxOutputTokens: 256,         // Adjust token size based on the expected output
    });

    const flashcards = response?.candidates?.[0]?.output || "No response"; // Safely access response
    return flashcards;
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw error;
  }
}
