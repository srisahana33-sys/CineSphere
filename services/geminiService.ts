
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async getAiRecommendationInsight(movieTitle: string, overview: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze the following movie: "${movieTitle}". Summary: "${overview}". 
        Provide a concise, catchy, 2-sentence "AI Verdict" on why a movie lover might enjoy this film. 
        Focus on themes, atmosphere, and cinematic appeal.`,
        config: {
          temperature: 0.7,
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini AI error:", error);
      return "An epic cinematic journey awaits you with this masterpiece.";
    }
  },

  async getMoodBasedRecommendations(mood: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `The user is in a "${mood}" mood. Suggest 3 specific movie genres or themes that would fit this mood. 
        Format as a JSON array of strings.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      return ["Action", "Sci-Fi", "Adventure"];
    }
  }
};
