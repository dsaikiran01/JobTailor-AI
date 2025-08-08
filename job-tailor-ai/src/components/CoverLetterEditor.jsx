// src/components/CoverLetterEditor.jsx
import { Editor } from "draft-js";
import "draft-js/dist/Draft.css";

export default function CoverLetterEditor({ editorState, onChange }) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "10px",
                minHeight: "200px",
                borderRadius: "6px",
                background: "#fff",
                marginTop: "1rem",
            }}
        >
            <Editor editorState={editorState} onChange={onChange} />
        </div>
    );
}
