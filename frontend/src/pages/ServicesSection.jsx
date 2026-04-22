import React from "react";

const ServicesSection = ({
  services = [],
}) => {
  return (
    <section className="py-20 bg-[#F3F4EC]">
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Our <span className="text-[#878C53]">Services</span>
          </h2>
          <p className="text-gray-600">
            From Concept to Execution, We Handle Every Detail
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h5 className="font-semibold text-lg mb-1">
                  {service.title}
                </h5>
                <p className="text-gray-500 text-sm">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center">
          <button className="border border-[#878C53] text-[#878C53] px-8 py-3 rounded-full hover:bg-[#878C53] hover:text-white transition duration-300">
            All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;