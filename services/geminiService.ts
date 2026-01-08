
import { GoogleGenAI } from "@google/genai";

/**
 * Gets smart recommendations based on search query and user language.
 */
export const getSmartRecommendations = async (query: string, language: string = 'pt-BR') => {
  if (!process.env.API_KEY) return "Please set an API key to enable AI features.";
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = language === 'pt-BR' 
    ? `Com base na busca: "${query}", sugira 3 tipos de negócios ou locais interessantes. Responda em Português do Brasil com um tom amigável e conciso.`
    : `Based on the directory search query: "${query}", suggest 3 types of businesses or locations a user might be interested in. Return a short friendly paragraph in English.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  
  return response.text;
};

/**
 * Generates marketing descriptions for listings in the specified language.
 */
export const generateListingDescription = async (title: string, type: string, language: string = 'pt-BR') => {
  if (!process.env.API_KEY) return "Set API Key to generate content.";

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = language === 'pt-BR'
    ? `Gere uma descrição de marketing profissional de 2 frases para um ${type} chamado "${title}" em Português do Brasil.`
    : `Generate a professional 2-sentence marketing description for a ${type} called "${title}" in English.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });

  return response.text;
};
