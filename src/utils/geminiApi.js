import axios from "axios";

export const generateGeminiResponse = async (prompt, apiKey) => {
  // Debug: in Development mode
  if (import.meta.env.DEV) {
    console.log("apikey: " + apiKey);
    console.log("type:", typeof apiKey);
  }

  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No result";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content.";
  }
};
