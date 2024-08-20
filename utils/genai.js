import { google } from 'googleapis';

// Initialize the Google API client
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const client = google.auth.fromAPIKey(apiKey);

export default client;
