// src/components/CoverLetterEditor.jsx
import React, { useState, useEffect } from "react";
import { Editor, EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

export default function CoverLetterEditor({ value, onChange }) {
  // Initialize EditorState from raw JSON or empty
  const [editorState, setEditorState] = useState(() =>
    value
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
      : EditorState.createEmpty()
  );

  // When editorState changes, propagate raw content back as string
  const handleChange = (state) => {
    setEditorState(state);
    const contentState = state.getCurrentContent();
    const raw = JSON.stringify(convertToRaw(contentState));
    onChange(raw);
  };

  // If `value` prop changes externally, update EditorState
  useEffect(() => {
    if (value) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(value))));
    }
  }, [value]);

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
      <Editor editorState={editorState} onChange={handleChange} />
    </div>
  );
}
