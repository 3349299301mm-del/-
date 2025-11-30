import { GoogleGenAI, Type } from "@google/genai";
import { Song } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMoodPlaylist = async (mood: string): Promise<Song[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a playlist of 5 songs that perfectly match the mood or activity: "${mood}". 
      Make up realistic sounding songs if real ones aren't available, but try to use real popular songs.
      Provide a diverse mix.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              artist: { type: Type.STRING },
              album: { type: Type.STRING },
              genre: { type: Type.STRING },
              moodReason: { type: Type.STRING, description: "A short reason why this song fits the mood" }
            },
            required: ["title", "artist", "album", "genre"]
          }
        }
      }
    });

    const rawSongs = JSON.parse(response.text || "[]");

    // Map the raw response to our application's Song interface
    // We generate random IDs and placeholder images since the API only returns text.
    return rawSongs.map((s: any, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      title: s.title,
      artist: s.artist,
      album: s.album,
      duration: 180 + Math.floor(Math.random() * 120), // Random duration between 3:00 and 5:00
      coverUrl: `https://picsum.photos/seed/${s.artist.replace(/\s/g, '')}${index}/300/300`,
      genre: s.genre,
      mood: s.moodReason
    }));

  } catch (error) {
    console.error("Error generating playlist:", error);
    return [];
  }
};
