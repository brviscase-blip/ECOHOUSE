
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AIModel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const model = AIModel.FLASH;

    const systemInstruction = `
      Você é o Assistente Virtual da CONSTRUÇÕES SUSTENTÁVEIS, uma empresa de construção civil e comercial focada em sustentabilidade e inovação.
      
      Suas diretrizes:
      1. Responda de forma profissional, educada e útil.
      2. Seu foco é ajudar clientes com dúvidas sobre obras, materiais sustentáveis, prazos médios e orçamentos estimativos.
      3. Se perguntarem sobre preços exatos, explique que depende de uma visita técnica, mas dê uma estimativa de mercado se tiver dados suficientes.
      4. Enfatize os valores da CONSTRUÇÕES SUSTENTÁVEIS: Qualidade, Pontualidade e Respeito ao Meio Ambiente.
      5. Responda sempre em Português do Brasil.
      6. Seja conciso nas respostas.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
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
