import React from "react";

const MapSection = () => {
  return (
    <section className="py-20 bg-[#F3F4EC]">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Find Us <span className="text-[#878C53]">Here</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Visit our banquet hall location easily
          </p>
        </div>

        {/* Map Container */}
        <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg border">

          <iframe
            title="banquet-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7006.058!2d77.3709823!3d28.6276075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5574455d57b%3A0xf19bca2bae503f87!2sIconic%20Tower!5e0!3m2!1sen!2sin!4v1713840000000"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />

        </div>

        {/* Optional CTA */}
        <div className="text-center mt-6">
          <a
            href="https://maps.google.com/?q=Iconic+Tower+Noida"
            target="_blank"
            rel="noreferrer"
            className="text-[#878C53] font-semibold underline"
          >
            Open in Google Maps →
          </a>
        </div>

      </div>
    </section>
  );
};

export default MapSection;