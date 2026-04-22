import React, { useState } from "react";

const TestimonialsSection = ({ testimonials = [] }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  // Prevent crash if empty
  if (!testimonials.length) return null;

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Client <span className="text-[#878C53]">Testimonials</span>
          </h2>
          <p className="text-gray-600">
            From Concept to Execution, We Handle Every Detail
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Left Content */}
          <div className="lg:w-2/5 text-center lg:text-left">
            <h4 className="text-2xl font-semibold mb-4">
              What Our Happy Clients Are Saying About Our Services.
            </h4>

            <p className="text-gray-600 mb-8">
              Discover the art of seamless event planning with our expert services.
              From intimate gatherings to grand celebrations, we bring your vision
              to life with creativity and precision.
            </p>

            <div className="flex justify-center lg:justify-start gap-4">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-[#878C53] flex items-center justify-center hover:bg-[#878C53] hover:text-white transition"
              >
                ←
              </button>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-[#878C53] flex items-center justify-center hover:bg-[#878C53] hover:text-white transition"
              >
                →
              </button>
            </div>
          </div>

          {/* Right Card */}
          <div className="lg:w-3/5">
            <div className="bg-[#F3F4EC] rounded-2xl p-8 transition duration-300">

              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold">{current.name}</p>
                    <p className="text-gray-500 text-sm">
                      {current.role}
                    </p>
                  </div>
                </div>

                <div className="text-[#878C53] text-4xl">“</div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {current.text}
              </p>

              <div className="flex gap-1 text-[#878C53]">
                {"★★★★★"}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;