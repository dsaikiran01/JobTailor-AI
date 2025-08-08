// src/components/CoverLetterEditor.jsx
import { Editor } from "draft-js";
import "draft-js/dist/Draft.css";

export default function CoverLetterEditor({ editorState, onChange }) {
    return (
        <div
            className="border border-gray-300 p-4 min-h-[200px] rounded-md bg-white mt-4"
        >
            <Editor editorState={editorState} onChange={onChange} />
        </div>

    );
}
