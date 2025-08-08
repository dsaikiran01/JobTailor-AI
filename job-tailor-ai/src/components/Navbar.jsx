import Logo from "../assets/Logo.svg";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + App Name */}
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="JobTailor Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold text-gray-800 tracking-tight">
            JobTailor <span className="text-blue-600">AI</span>
          </span>
        </div>

        {/* Optional: Future links or buttons */}
        {/* <div className="space-x-6 hidden md:flex">
          <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
        </div> */}
      </div>
    </nav>
  );
}
