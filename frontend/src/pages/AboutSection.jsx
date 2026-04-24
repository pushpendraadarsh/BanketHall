import React from "react";
import { motion } from "framer-motion";

/* ✅ ICONS FIXED (added properly) */
const HeadsetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2"></rect>
  </svg>
);

const AboutSection = ({
  image = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=800&fit=crop",
}) => {
  const stats = [
    { value: "50+", label: "Sales Executives", icon: <HeadsetIcon /> },
    { value: "5000+", label: "Events Organized", icon: <CheckCircleIcon /> },
    { value: "14", label: "Years of Experience", icon: <CalendarIcon /> },
  ];

  const blobShape = {
    borderRadius: "45% 55% 40% 60% / 55% 45% 60% 40%",
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#f8f9f2] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative max-w-sm sm:max-w-md lg:max-w-lg mx-auto"
          >
            <div
              className="absolute inset-0 border-[4px] sm:border-[6px] border-[#d8dcc0] z-0"
              style={blobShape}
            />

            <motion.img
              src={image}
              alt="About Event Venue"
              className="w-full h-auto object-cover relative z-10 shadow-lg"
              style={{ ...blobShape, aspectRatio: "1/1" }}
              whileHover={{ scale: 1.03 }}
            />
          </motion.div>

          {/* CONTENT */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >

            {/* HEADING */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#5c6130]">
                About Us
              </h2>
              <div className="flex items-center">
                <div className="h-[2px] w-8 sm:w-12 bg-[#d1d5db]" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 bg-[#d1d5db] -ml-1" />
              </div>
            </motion.div>

            {/* TITLE */}
            <motion.h3
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-4 sm:mb-6 leading-snug sm:leading-tight"
            >
              Create Special Moments for<br className="hidden sm:block" />
              Your Events
            </motion.h3>

            {/* DESCRIPTION */}
            <motion.div
              variants={fadeUp}
              className="text-gray-600 mb-8 sm:mb-10 leading-relaxed space-y-3 sm:space-y-4 text-sm sm:text-base"
            >
              <p>
                At our event planning company, we pride ourselves on creating unforgettable experiences.
              </p>
              <p>
                We take the time to understand your vision and execute every detail perfectly.
              </p>
            </motion.div>

            {/* STATS */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 sm:mb-10"
            >
              {stats.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className="flex items-start gap-3"
                >
                  <div className="text-[#878C53] mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-semibold text-gray-900">
                      {item.value}
                    </div>
                    <div className="text-gray-500 text-xs sm:text-sm mt-1">
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* BUTTON */}
            <motion.button
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto border-2 border-[#878C53] text-[#878C53] font-medium px-6 sm:px-8 py-3 rounded-full hover:bg-[#878C53] hover:text-white transition"
            >
              More About Us
            </motion.button>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;