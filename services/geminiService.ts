
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AIModel } from "../types";

// Função para obter a instância da IA de forma segura
const getAIInstance = () => {
  const apiKey = process.env.API_KEY || "";
  return new GoogleGenAI({ apiKey });
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const ai = getAIInstance();
    const model = AIModel.FLASH;

    const systemInstruction = `
      Você é o Assistente Virtual da CONSTRUÇÕES SUSTENTÁVEIS, uma empresa de construção civil focada em sustentabilidade.
      Responda de forma profissional, educada e útil em Português do Brasil.
      Foque em obras, materiais sustentáveis e orçamentos estimativos.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: [
        ...history.map(h => ({ role: h.role as any, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Desculpe, não consegui processar sua resposta no momento.";

  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "O assistente está temporariamente indisponível. Por favor, verifique se a chave de API foi configurada corretamente.";
  }
};
