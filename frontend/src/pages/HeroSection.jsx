import React from "react";

// Pointing Finger Icon SVG
const PointerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
  </svg>
);

// Decorative Bunting Flags SVG
const BuntingFlags = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mb-8 w-64 md:w-80 h-auto"
  >
    {/* The string */}
    <path d="M0 20 Q 200 50 400 10" stroke="#d1d5db" strokeWidth="2" fill="none" />
    
    {/* Solid Dark Olive Flags */}
    <polygon points="30,22 50,65 70,25" fill="#757a41" />
    <polygon points="170,33 190,75 210,34" fill="#757a41" />
    <polygon points="300,23 315,65 335,20" fill="#757a41" />

    {/* Striped/Lighter Olive Flags */}
    <polygon points="100,28 120,70 140,30" fill="#a4a977" />
    <polygon points="240,31 255,70 275,27" fill="#a4a977" />
    <polygon points="350,18 365,55 380,14" fill="#a4a977" />
  </svg>
);

const HeroSection = () => {
  return (
    // Background matches the light cream tone
    <section className="pt-24 pb-20 md:pt-32 md:pb-32 bg-[#fafbf6] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Side: Content */}
          <div className="lg:w-[45%] z-10">
            <BuntingFlags />

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-medium text-gray-900 mb-6 leading-[1.15]">
              Create <span className="text-[#878C53]">Special Moments</span><br /> for Your Event
            </h1>
            
            <p className="text-gray-500 text-base md:text-lg mb-10 leading-relaxed pr-4">
              From intimate gatherings to grand celebrations, we design
              unforgettable experiences tailored to your vision. Let us turn
              your dreams into reality!
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <button className="bg-[#878C53] text-white px-7 py-3.5 rounded-full hover:bg-[#6b6f42] transition-colors flex items-center gap-2 font-medium">
                Book Now
                <PointerIcon />
              </button>
              <button className="border border-[#878C53] text-[#878C53] px-7 py-3.5 rounded-full hover:bg-[#878C53] hover:text-white transition-colors font-medium">
                Explore Services
              </button>
            </div>
          </div>

          {/* Right Side: Overlapping Image Composition */}
          <div className="lg:w-[55%] relative w-full h-[500px] md:h-[600px] mt-10 lg:mt-0">
            
            {/* Background Right Image (Wine Glasses) */}
            <div className="absolute top-[15%] right-[-5%] w-[45%] h-[55%] rounded-3xl overflow-hidden shadow-lg z-0 opacity-90">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=800&fit=crop"
                alt="Table Setup"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Main Center Image (Banquet Hall) */}
            <div className="absolute top-0 right-[15%] w-[65%] h-[85%] rounded-3xl overflow-hidden shadow-2xl z-10">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=1000&fit=crop"
                alt="Banquet Hall"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Foreground Arch Image (Table Centerpiece) */}
            <div className="absolute bottom-[5%] left-[5%] w-[45%] h-[45%] rounded-t-[120px] rounded-b-3xl overflow-hidden shadow-2xl z-20 border-[8px] border-[#fafbf6]">
              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=500&fit=crop"
                alt="Centerpiece"
                className="w-full h-full object-cover"
              />
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;