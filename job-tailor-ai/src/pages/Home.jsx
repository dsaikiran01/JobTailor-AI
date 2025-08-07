import { useState, useRef, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import { generateGeminiResponse } from "../utils/geminiApi";
import Loader from "../components/Loader";
import html2pdf from "html2pdf.js";
import CoverLetterEditor from "../components/CoverLetterEditor";
import { EditorState, convertToRaw, convertFromRaw, ContentState } from "draft-js";

export default function Home() {
    const [resumeText, setResumeText] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [loading, setLoading] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);

    const pdfRef = useRef();

    // Convert plain text to Draft.js raw content
    const textToRawDraft = (text) => {
        const contentState = ContentState.createFromText(text);
        return JSON.stringify(convertToRaw(contentState));
    };

    // Convert Draft raw to HTML string (basic formatting)
    const draftRawToHTML = (raw) => {
        if (!raw) return "";
        const contentState = convertFromRaw(JSON.parse(raw));
        const blocks = contentState.getBlocksAsArray();

        return blocks.map(block => `<p>${block.getText()}</p>`).join("");
    };


    const handleGenerate = async () => {
        if (!resumeText || !jobDesc) {
            alert("Please upload a resume and paste the job description.");
            return;
        }

        const prompt = `
      You are a professional career advisor. Based on the resume and job description below, generate a tailored cover letter.

      Resume:
      ${resumeText}

      Job Description:
      ${jobDesc}
    `;

        setLoading(true);
        try {
            const res = await generateGeminiResponse(prompt);
            const contentState = ContentState.createFromText(res);
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
            setHasGenerated(true);
        } catch (err) {
            alert("Something went wrong while generating the cover letter.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = () => {
        const contentState = editorState.getCurrentContent();
        const blocks = contentState.getBlocksAsArray();
        const html = blocks.map(block => `<p>${block.getText()}</p>`).join("");

        const element = document.createElement("div");
        element.style.padding = "20px";
        element.innerHTML = html;

        html2pdf()
            .from(element)
            .set({
                margin: 0.5,
                filename: "cover-letter.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
            })
            .save();
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
                {loading ? <Loader /> : "Generate Cover Letter"}
            </button>

            {!loading && hasGenerated && (
                <>
                    <div ref={pdfRef} style={{ marginTop: "2rem", backgroundColor: "#fff", color: "#000", }}>
                        <h2>Editable Cover Letter:</h2>
                        <CoverLetterEditor editorState={editorState} onChange={setEditorState} />                    </div>


                    <button onClick={handleDownloadPDF} style={{ marginTop: "1rem" }}>
                        Download as PDF
                    </button>
                </>
            )}
        </div>
    );
}
