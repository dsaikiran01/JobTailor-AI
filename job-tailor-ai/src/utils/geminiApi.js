import axios from "axios";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

export const generateGeminiResponse = async (prompt) => {
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
