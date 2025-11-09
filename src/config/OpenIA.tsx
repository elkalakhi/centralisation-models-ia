import OpenAI from "openai";

async function runChatOpenIa(prompt: string): Promise<{ text?: string }> {
  // Initialise le client avec ta clé API OpenAI
  const client = new OpenAI({
    apiKey: "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", // ⚠️ Ne jamais exposer la clé directement
  });

  // Choisis ton modèle (texte uniquement)
  const model = "gpt-4o-mini"; // tu peux mettre "gpt-4o" ou "gpt-3.5-turbo"

  // Crée une requête de chat
  const stream = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    stream: true, // active le streaming
  });

  let textResult = "";

  // Lecture du flux de réponse (stream)
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";
    if (content) {
      process.stdout.write(content); // affiche en direct
      textResult += content;
    }
  }

  console.log("\n\nFinal result:", textResult);
  return { text: textResult.trim() };
}

export default runChatOpenIa;
