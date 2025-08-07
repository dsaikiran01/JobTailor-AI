import { useState, useRef, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import { generateGeminiResponse } from "../utils/geminiApi";
import Loader from "../components/Loader";
import CoverLetterEditor from "../components/CoverLetterEditor";
import { EditorState, convertToRaw, convertFromRaw, ContentState } from "draft-js";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import CoverLetterPDF from "../components/CoverLetterPDF";
import { saveAs } from "file-saver";

export default function Home() {
    const [resumeText, setResumeText] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [loading, setLoading] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);

    const pdfRef = useRef();

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

    const handleDownloadPDF = async () => {
        const content = editorState.getCurrentContent().getPlainText();
        const blob = await pdf(<CoverLetterPDF content={content} />).toBlob();
        saveAs(blob, "cover-letter.pdf");
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
