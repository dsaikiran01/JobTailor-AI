# 💼 JobTailor AI — Smart Job Application Assistant

JobTailor AI is a modern AI-powered web application designed to help job seekers generate professional, customized cover letters based on their resume and a job description. Built using React and Google's Gemini API, it streamlines the job application process with just a few clicks.

---

## 🚀 Features Implemented

### ✅ PDF Resume Upload
- Upload a resume in `.pdf` format.
- Automatically extract clean text from the resume using [`react-pdftotext`](https://www.npmjs.com/package/react-pdftotext).
- No backend or MIME errors — fully frontend and Vite-compatible.

### ✅ AI Cover Letter Generation
- Paste a job description.
- Generate a customized cover letter using Gemini 1.5 Flash Free API.
- Prompt crafted for professional tone and resume-job alignment.

### ✅ Live Preview + Rich Text Editing
- Editable WYSIWYG interface built using `draft-js`.
- Users can tweak AI output before exporting.

### ✅ Download as PDF
- Clean, styled PDF export using [`@react-pdf/renderer`](https://react-pdf.org/).
- Ensures layout is preserved even without a backend.

### ✅ Loading Spinner
- Clean, non-blocking loading spinner while Gemini is processing.

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **AI API:** Google Gemini 1.5 Flash (via free API key)
- **PDF Parsing:** [`react-pdftotext`](https://www.npmjs.com/package/react-pdftotext)
- **PDF Download:** [`@react-pdf/renderer`](https://react-pdf.org/)
- **Text Editor:** [`draft-js`](https://draftjs.org/)
- **Styling:** Basic inline styles (can be replaced with Tailwind or CSS Modules)

---

## 📂 Project Structure

```
src/
├── components/
│   ├── FileUpload.jsx        // Resume upload + parsing
│   ├── Loader.jsx            // Spinner component
│   ├── CoverLetterEditor.jsx // Editable WYSIWYG component
│   └── CoverLetterPDF.jsx    // PDF layout using react-pdf
├── pages/
│   └── Home.jsx              // Main UI logic
├── utils/
│   ├── geminiApi.js          // API call to Gemini
│   └── pdfParser.js          // PDF parsing using react-pdftotext
```

---

## 🔮 Future Improvements

### 🧠 AI Features
- ATS (Applicant Tracking System) feedback on resume
- Gemini-based resume rewriting suggestions
- Interview question generation from job description
- Resume-to-job match score / confidence indicator

### 🌐 UX Enhancements
- Drag & drop resume upload
- Save generated letters to local storage or cloud
- Dark mode / theming
- Resume preview with highlights

### 📦 Deployment / Security
- Deploy to Vercel with secure env handling for API key
- Optional backend for secure Gemini API key proxy (Node.js / Firebase)
- Offline support (PWA)

---

## ⚙️ How to Run Locally

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your Gemini API Key in `.env`:
   ```env
   VITE_GEMINI_API_KEY=your_google_api_key
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

---

## ✨ Credits

- [Google Gemini API](https://ai.google.dev/)
- [react-pdftotext](https://www.npmjs.com/package/react-pdftotext)
- [@react-pdf/renderer](https://react-pdf.org/)
- [draft-js](https://draftjs.org/)

---

## 📌 License

MIT — free to use, modify, and build upon.
