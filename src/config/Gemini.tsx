import { GoogleGenAI } from "@google/genai";

async function runChat(prompt: string): Promise<{ text?: string }> {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyAULCqJGIExOEXf4he5E12SZT3ya1aDiF0",
  });

  const model = "gemini-2.0-flash"; // ✅ text-only model
  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    contents,
  });

  let textResult = "";

  for await (const chunk of response) {
    const part = chunk?.candidates?.[0]?.content?.parts?.[0];
    console.log("part:", part?.text);
    
    if (part?.text) {
      textResult += part.text + "\n";
    }
  }

  console.log("textResult:", textResult);
  return { text: textResult.trim() };
}

export default runChat;
