import { useState } from "react";
import FileUpload from "../components/FileUpload";
import { generateGeminiResponse } from "../utils/geminiApi";
import Loader from "../components/Loader";
import { useRef } from "react";
import html2pdf from "html2pdf.js";

export default function Home() {
    const [resumeText, setResumeText] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const pdfRef = useRef();


    const handleDownloadPDF = () => {
        const element = pdfRef.current;

        const options = {
            margin: 0.5,
            filename: 'cover-letter.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(options).from(element).save();
    };

    const handleGenerate = async () => {
        console.log("resume text: ", resumeText);
        console.log("job desc: ", jobDesc);
        
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
                <>
                    <div
                        ref={pdfRef}
                        style={{
                            marginTop: "2rem",
                            whiteSpace: "pre-wrap",
                            border: "1px solid #ddd",
                            padding: "1rem",
                            backgroundColor: "#fff",
                            color: "#000",
                        }}
                    >
                        <h2>Generated Cover Letter:</h2>
                        <p>{output}</p>
                    </div>

                    <button onClick={handleDownloadPDF} style={{ marginTop: "1rem" }}>
                        Download as PDF
                    </button>
                </>
            )}

        </div>
    );
}
