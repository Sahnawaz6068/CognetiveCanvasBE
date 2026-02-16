import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateJsonPpt = async (req, res) => {
  try {
    const topic = req.body.topic;
    console.log(topic);

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required in request body",
      });
    }

    const prompt = `
You are an expert PPT builder.

Create a high-quality, college-level presentation on "${topic}" with **visual-first slides**.
Prefer diagrams, animations, simulations, and visual layouts over long text.

REQUIREMENTS
- Output a SINGLE self-contained HTML file
- Use only responsive layouts (flex / grid)
- No fixed heights, no overflow:hidden
- Content must expand vertically and remain fully visible
- Navigation (Next / Previous) must be in a footer BELOW content
- Must work cleanly inside an iframe (no scaling hacks)
- If diagrams are needed, build them using HTML + CSS (no images)

DESIGN
- Center content with max-width (900–1100px)
- Adequate padding (24–40px)
- Allow vertical scrolling when needed

FUNCTIONAL
- Include CSS in <style>
- Include JS for slide navigation
- Minimum 5 slides

OUTPUT
Return ONLY valid JSON:
{
  "topic": "${topic}",
  "status": "success",
  "htmlContent": "<html>...</html>"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      config: {
        systemInstruction: "You are a JSON generator. Output ONLY valid JSON.",
      },
    });

    const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error("Empty response from Gemini");
    }

    const cleanJson = rawText.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleanJson);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("PPT Generation Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export default {
  generateJsonPpt,
};
