import { useState } from "react";
import { generateGeminiResponse } from "../utils/geminiApi";

export default function Generator() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    const prompt = `
You are a career advisor...

Resume:
${resume}

Job Description:
${jobDesc}
`;
    const output = await generateGeminiResponse(prompt);
    setResult(output);
  };

  return (
    <>
      <textarea value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Paste resume here" />
      <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} placeholder="Paste job description here" />
      <button onClick={handleGenerate}>Generate Cover Letter</button>
      <pre>{result}</pre>
    </>
  );
}
