import { useState, useRef } from "react";
import FileUpload from "../components/FileUpload";
import { generateGeminiResponse } from "../utils/geminiApi";
import Loader from "../components/Loader";
import CoverLetterEditor from "../components/CoverLetterEditor";
import { EditorState, ContentState } from "draft-js";
import { pdf } from "@react-pdf/renderer";
import CoverLetterPDF from "../components/CoverLetterPDF";
import { saveAs } from "file-saver";
import Navbar from "../components/Navbar";

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
        <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50 overflow-y-scroll">
            <Navbar />
            <div className="w-full max-w-3xl mt-16 p-8 text-center">
                <h1 className="text-3xl  font-bold mb-6 dark:text-black">Smart Job Application Assistant</h1>

                <FileUpload onExtracted={setResumeText} />

                <div className="mt-8">
                    <label className="block mb-2 font-medium">
                        Paste Job Description:
                        <textarea
                            rows="10"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={jobDesc}
                            onChange={(e) => setJobDesc(e.target.value)}
                            placeholder="Paste the job description here"
                        />
                    </label>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader /> : "Generate Cover Letter"}
                </button>

                {!loading && hasGenerated && (
                    <>
                        <div
                            ref={pdfRef}
                            className="mt-8 p-6 bg-white text-black shadow-md rounded"
                        >
                            <h2 className="text-xl font-semibold mb-4">Editable Cover Letter:</h2>
                            <CoverLetterEditor
                                editorState={editorState}
                                onChange={setEditorState}
                            />
                        </div>

                        <button
                            onClick={handleDownloadPDF}
                            className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Download as PDF
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
