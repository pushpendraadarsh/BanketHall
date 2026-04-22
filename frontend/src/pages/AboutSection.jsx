import React from "react";

// Inline SVG Icons to match the design
const HeadsetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
    <path d="M12 22v-3"></path>
    <path d="M12 15h.01"></path>
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const AboutSection = ({
  image = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=800&fit=crop",
}) => {
  const stats = [
    { value: "50 +", label: "Sales Executives", icon: <HeadsetIcon /> },
    { value: "5000 +", label: "Events Organized", icon: <CheckCircleIcon /> },
    { value: "14", label: "Years of Experience", icon: <CalendarIcon /> },
  ];

  // Custom border radius to create the organic "blob" shape
  const blobShape = {
    borderRadius: "45% 55% 40% 60% / 55% 45% 60% 40%",
  };

  return (
    // Background color roughly matching the cream/off-white in the screenshot
    <section className="py-20 bg-[#f8f9f2]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Image with Blob Shape */}
          <div className="lg:w-1/2 relative p-4 w-full max-w-lg mx-auto">
            {/* Outer border shape */}
            <div 
              className="absolute inset-0 border-[6px] border-[#d8dcc0] z-0"
              style={blobShape}
            ></div>
            
            {/* Inner image */}
            <img
              src={image}
              alt="About Event Venue"
              className="w-full h-auto object-cover relative z-10 shadow-lg"
              style={{ ...blobShape, aspectRatio: "1/1" }}
            />
          </div>

          {/* Right Side: Content */}
          <div className="lg:w-1/2">
            
            {/* Section Heading with Line & Diamond Decor */}
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5c6130]">
                About Us
              </h2>
              <div className="flex items-center">
                <div className="h-[2px] w-12 bg-[#d1d5db]"></div>
                <div className="w-2.5 h-2.5 rotate-45 bg-[#d1d5db] -ml-1"></div>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
              Create Special Moments for<br />Your Events
            </h3>

            <div className="text-gray-600 mb-10 leading-relaxed space-y-4 text-sm md:text-base pr-4">
              <p>
                At our event planning company, we pride ourselves on creating unforgettable
                experiences that truly embody your individual style and preferences. From intimate
                gatherings with close friends and family to extravagant celebrations.
              </p>
              <p>
                That leave a lasting impression, our team is committed to transforming your ideas
                into reality. We take the time to understand your vision, ensuring every detail is
                meticulously planned and executed, so you can relax and enjoy the moment!
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {stats.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="text-[#878C53] mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-gray-900 flex items-center">
                      {item.value}
                    </div>
                    <div className="text-gray-500 text-sm mt-1">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Button */}
            <button className="border-2 border-[#878C53] text-[#878C53] font-medium px-8 py-3 rounded-full hover:bg-[#878C53] hover:text-white transition-colors duration-300">
              More About Us
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;