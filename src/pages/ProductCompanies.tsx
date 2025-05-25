import { useEffect, useState } from "react";

// Define interfaces for carousel slides and hover cards
interface CarouselSlide {
  title: string;
  button: string;
  src: string;
}

interface HoverCardItem {
  title: string;
  description: string;
  link: string;
}

const ProductCompanies = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 2000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Sample data for carousel
  const carouselSlides: CarouselSlide[] = [
    {
      title: "Top Tech Companies",
      button: "Learn More",
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    },
    {
      title: "Product Development",
      button: "Explore",
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
    },
    {
      title: "Innovation Hubs",
      button: "Discover",
      src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069",
    },
  ];

  // Sample data for hover cards
  const hoverCards: HoverCardItem[] = [
    {
      title: "Software Development",
      description: "Explore opportunities in software development roles at leading product companies.",
      link: "/software-dev",
    },
    {
      title: "Product Management",
      description: "Learn about product management careers and the skills needed to succeed.",
      link: "/product-management",
    },
    {
      title: "Data Science",
      description: "Discover data science roles and career paths in product companies.",
      link: "/data-science",
    },
    {
      title: "UX/UI Design",
      description: "Find out about design roles and opportunities in product companies.",
      link: "/design",
    },
    {
      title: "DevOps",
      description: "Explore DevOps careers and the growing demand in product companies.",
      link: "/devops",
    },
    {
      title: "Quality Assurance",
      description: "Learn about QA roles and career progression in product companies.",
      link: "/qa",
    },
  ];

  // Simple Carousel Component
  const SimpleCarousel = ({ slides }: { slides: CarouselSlide[] }) => (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
        {slides.map((slide: CarouselSlide, index: number) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {slide.title}
              </h3>
              <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                {slide.button}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center mt-6 space-x-3">
        {slides.map((_: CarouselSlide, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-indigo-400" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );

  // Simple Hover Cards Component
  const HoverCards = ({ items }: { items: HoverCardItem[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item: HoverCardItem, index: number) => (
        <div
          key={index}
          className="group relative bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/10"
        >
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {item.description}
          </p>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Simple Spotlight Component
  const SimpleSpotlight = () => (
    <div className="absolute top-40 left-0 w-96 h-96 opacity-30">
      <div className="w-full h-full bg-gradient-radial from-white/20 via-white/5 to-transparent rounded-full blur-3xl" />
    </div>
  );

  return (
    <div className="bg-gray-900 text-gray-100 relative overflow-x-hidden">
      <SimpleSpotlight />

      {/* Hero Section with Carousel */}
      <section className="pt-12 pb-10 px-4 bg-gradient-to-b from-gray-800/90 to-gray-900/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-center">
            Product <span className="text-indigo-400">Companies</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 text-center leading-relaxed">
            Discover opportunities at leading product-based companies and learn about different career paths.
          </p>
          <SimpleCarousel slides={carouselSlides} />
        </div>
      </section>

      {/* Career Paths Section with Hover Cards */}
      <section className="py-20 px-4 bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Explore Career <span className="text-indigo-400">Paths</span>
          </h2>
          <HoverCards items={hoverCards} />
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-20 px-4 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Why Choose Product Companies?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">Innovation & Growth</h3>
              <p className="text-gray-300 leading-relaxed">
                Product companies are at the forefront of innovation, offering opportunities to work on cutting-edge technologies and solutions that shape the future.
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">Career Development</h3>
              <p className="text-gray-300 leading-relaxed">
                With structured career paths and continuous learning opportunities, product companies provide an ideal environment for professional growth.
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">Work-Life Balance</h3>
              <p className="text-gray-300 leading-relaxed">
                Many product companies prioritize employee well-being, offering flexible work arrangements and comprehensive benefits packages.
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">Impact & Ownership</h3>
              <p className="text-gray-300 leading-relaxed">
                Work on products that directly impact millions of users and take ownership of features that drive business success.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCompanies;