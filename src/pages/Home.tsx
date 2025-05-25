import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col relative">
      <header className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-gray-800/90 to-gray-900/90 backdrop-blur-sm flex-grow">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Welcome to <span className="text-indigo-400">Career Guide</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Discover the ultimate solution for seamless navigation and productivity.
          Your journey starts here with Guide App.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/ProductCompanies"
            className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
          >
            Product Based
          </Link>
          <Link
            to="/ServiceCompanies"
            className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
          >
            Service Based
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Home;