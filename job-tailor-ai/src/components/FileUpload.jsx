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
      onExtracted(text); // send extracted resume text to parent
    } catch (err) {
      setError("Failed to parse PDF.");
      console.error(err);
    }
  };

  return (
    <div>
      <label>
        Upload Resume (PDF):
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </label>
      {fileName && <p>Uploaded: {fileName}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
