import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AIModel } from "../types";

// Initialize the client with the API key from the environment
// Note: In a real production app, backend proxy is recommended to hide the key.
// For this demo, we assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "A chave da API não foi configurada. Por favor, verifique suas configurações.";
    }

    const model = AIModel.FLASH;

    const systemInstruction = `
      Você é o Assistente Virtual da ECOHOUSE, uma empresa de construção civil e comercial focada em sustentabilidade e inovação.
      
      Suas diretrizes:
      1. Responda de forma profissional, educada e útil.
      2. Seu foco é ajudar clientes com dúvidas sobre obras, materiais sustentáveis, prazos médios e orçamentos estimativos.
      3. Se perguntarem sobre preços exatos, explique que depende de uma visita técnica, mas dê uma estimativa de mercado se tiver dados suficientes.
      4. Enfatize os valores da ECOHOUSE: Qualidade, Pontualidade e Respeito ao Meio Ambiente.
      5. Responda sempre em Português do Brasil.
      6. Seja conciso nas respostas.
    `;

    // Using the chat feature to maintain context if needed, but here we treat it as a single generateContent with instruction
    // for simplicity in this specific integration, or use ai.chats.create if persistent history is managed by the service.
    // Given the component manages history visually, let's use generateContent with system instruction.
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })), // Previous context
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
    return "Desculpe, ocorreu um erro ao conectar com o assistente. Tente novamente mais tarde.";
  }
};