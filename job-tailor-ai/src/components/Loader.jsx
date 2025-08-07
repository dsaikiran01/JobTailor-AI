import './Loader.css';

export default function Loader() {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <p>Generating your content...</p>
    </div>
  );
}
