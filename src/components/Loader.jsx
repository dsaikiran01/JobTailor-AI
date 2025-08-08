import { RingLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex items-center justify-center min-h-screen">
        <RingLoader color="#08e69cff" size={120} />
        <p className="mt-4 text-dark text-xl font-medium animate-pulse">
          Generating your content...
        </p>
      </div>
    </div>
  );
}
