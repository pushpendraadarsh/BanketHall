 import React from "react";

const PricingSection = ({ pricingPlans = [] }) => {
  return (
    <section className="py-20 bg-[#F3F4EC]">
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Our <span className="text-[#878C53]">Pricing</span>
          </h2>
          <p className="text-gray-600">
            From Concept to Execution, We Handle Every Detail
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl p-6 shadow-lg transition duration-300 hover:shadow-xl ${
                idx === 0 ? "border-2 border-[#878C53]" : ""
              }`}
            >
              {/* Title */}
              <h6 className="font-semibold text-lg mb-2">
                {plan.name}
              </h6>

              <p className="text-gray-500 text-sm mb-4">
                Ideal for individuals who need features and tools for client work.
              </p>

              {/* Price */}
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold">
                  {plan.price}
                </span>
                <span className="text-gray-500 ml-1">
                  / Event
                </span>
              </div>

              {/* Button */}
              <button className="w-full bg-[#878C53] text-white py-2 rounded-full mb-6 hover:bg-[#6b6f42] transition duration-300">
                Plan Your Event
              </button>

              {/* Included Features */}
              {plan.features?.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 mb-3">
                  <span className="text-[#878C53]">✓</span>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}

              {/* Excluded Features */}
              {plan.excluded?.map((excluded, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 mb-3 opacity-50"
                >
                  <span className="text-gray-400">✗</span>
                  <span className="text-sm line-through">
                    {excluded}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PricingSection;