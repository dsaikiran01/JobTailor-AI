import { useState } from "react";
import FileUpload from "../components/FileUpload";
import { generateGeminiResponse } from "../utils/geminiApi";
import Loader from "../components/Loader";

export default function Home() {
    const [resumeText, setResumeText] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleGenerate = async () => {
        if (!resumeText || !jobDesc) {
            alert("Please upload a resume and paste the job description.");
            return;
        }

        const prompt = `
            You are a professional career advisor. Based on the resume and job description below, generate a tailored cover letter.

            ---

            Resume:
            ${resumeText}

            ---

            Job Description:
            ${jobDesc}
        `;

        setLoading(true);
        const result = await generateGeminiResponse(prompt);
        setOutput(result);
        setLoading(false);
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
            <h1>Smart Job Application Assistant</h1>

            <FileUpload onExtracted={setResumeText} />

            <div style={{ marginTop: "2rem" }}>
                <label>
                    Paste Job Description:
                    <textarea
                        rows="10"
                        style={{ width: "100%" }}
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                        placeholder="Paste the job description here"
                    />
                </label>
            </div>

            <button onClick={handleGenerate} disabled={loading} style={{ marginTop: "1rem" }}>
                {/* {loading ? "Generating..." : "Generate Cover Letter"} */}
                {loading && <Loader />}
            </button>

            {output && (
                <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap", border: "1px solid #ddd", padding: "1rem" }}>
                    <h2>Generated Cover Letter:</h2>
                    <p>{output}</p>
                </div>
            )}
        </div>
    );
}
