import { useState } from "react";
import { extractTextFromPDF } from "../utils/pdfParser";

export default function FileUpload({ onExtracted }) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setError("");

    if (!file || file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    setFileName(file.name);

    try {
      const text = await extractTextFromPDF(file);
      onExtracted(text);
    } catch (err) {
      setError("Failed to parse PDF.");
    }
  };

  return (
    <div className="mb-8 flex items-center justify-center">
      <label className="block font-medium text-gray-700 mb-2">
        Upload Resume (PDF):
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="mt-2 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 
                 file:rounded file:border-0 file:text-sm file:font-semibold 
                 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
      </label>

      {fileName && (
        <p className="mt-2 text-green-600 font-medium">Uploaded: {fileName}</p>
      )}

      {error && (
        <p className="mt-2 text-red-600 font-medium">{error}</p>
      )}
    </div>

  );
}
