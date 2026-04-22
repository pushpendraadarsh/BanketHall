import React from "react";

const GallerySection = ({ galleryImages = [] }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Events <span className="text-[#878C53]">Gallery</span>
          </h2>
          <p className="text-gray-600">
            From Concept to Execution, We Handle Every Detail
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          {/* Column 1 */}
          <div className="space-y-6">
            <img
              src={galleryImages[0]}
              alt="Gallery 1"
              className="rounded-xl w-full h-64 object-cover shadow-md hover:scale-105 transition duration-300"
            />
            <img
              src={galleryImages[1]}
              alt="Gallery 2"
              className="rounded-xl w-full h-48 object-cover shadow-md hover:scale-105 transition duration-300"
            />
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <img
              src={galleryImages[2]}
              alt="Gallery 3"
              className="rounded-xl w-full h-56 object-cover shadow-md hover:scale-105 transition duration-300"
            />
            <img
              src={galleryImages[3]}
              alt="Gallery 4"
              className="rounded-xl w-full h-56 object-cover shadow-md hover:scale-105 transition duration-300"
            />
          </div>

          {/* Column 3 */}
          <div>
            <img
              src={galleryImages[4]}
              alt="Gallery 5"
              className="rounded-xl w-full h-full min-h-[400px] object-cover shadow-md hover:scale-105 transition duration-300"
            />
          </div>

        </div>

        {/* Button */}
        <div className="text-center">
          <button className="border border-[#878C53] text-[#878C53] px-8 py-3 rounded-full hover:bg-[#878C53] hover:text-white transition duration-300">
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;