import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateJsonPpt = async (req, res) => {
  try {
    const topic = req.body.topic;
    console.log(topic)

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required in request body",
      });
    }

    const prompt = `
You are an expert PPT Builder. Generate a high-quality, college-level presentation on the topic: "${topic}".

REQUIREMENTS:
1. Create a SINGLE self-contained HTML file.
2. Include modern CSS for styling and animations within <style> tags.
3. Include JavaScript for "Next" and "Previous" slide navigation within <script> tags.
4. The presentation must have at least 5 slides.

OUTPUT FORMAT:
Return ONLY valid JSON. No markdown. No backticks.
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
        systemInstruction:
          "You are a JSON generator. Output ONLY valid JSON.",
      },
    });

    const rawText =
      response.candidates?.[0]?.content?.parts?.[0]?.text;

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

const savePpt = async (req,res)=>{
  const {topic,htmlContent} =  req.body;
  
  try {
    
  } catch (error) {
    
  }
}

export default {
  generateJsonPpt,
  savePpt
};
