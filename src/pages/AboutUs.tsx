import Spotlight from "@/components/ui/Spotlight";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
       <Spotlight className="top-0 left-0 w-48 h-228" fill="grey" />
      <header className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900 flex-grow">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          About <span className="text-indigo-400">Career Guide</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-4">
          At Career Guide, we are dedicated to empowering your professional journey with seamless navigation and insightful resources.
        </p>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Our mission is to connect you with the best opportunities in product-based and service-based companies, helping you achieve your career goals with confidence.
        </p>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Our mission is to connect you with the best opportunities in product-based and service-based companies, helping you achieve your career goals with confidence.
        </p>
        
      </header>
    </div>
  );
};

export default AboutUs;