import { genIntentModel } from "../lib/geminiAgent.js";

export const getStreamedOverview = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).send("Query required");
  }

  try {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    const model = genIntentModel(`
      You are a web expert.
      Goal: Provide a concise overview of the user's query.
      Constraints:
      - Write exactly 2-3 short paragraphs.
      - Be factual, neutral, and objective.
      - Do not use markdown (no bolding, no headers), just plain text.
    `);
    console.log(q)

    const result = await model.generateContentStream(q);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText);
    }

    res.end();

  } catch (error) {
    console.error("Streaming error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Stream failed" });
    } else {
      res.end();
    }
  }
};