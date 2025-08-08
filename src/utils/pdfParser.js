import pdfToText from "react-pdftotext";

export const extractTextFromPDF = async (file) => {
  try {
    const text = await pdfToText(file);
    return text;
  } catch (error) {
    console.error("Failed to extract text from PDF:", error);
    throw error;
  }
};
