import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Pointer Icon
const PointerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 11V6a2 2 0 0 0-2-2"></path>
  </svg>
);

const HeroSection = () => {
  const { scrollY } = useScroll();

  // Parallax layers
  const yMain = useTransform(scrollY, [0, 500], [0, -50]);
  const yBack = useTransform(scrollY, [0, 500], [0, -80]);
  const yFront = useTransform(scrollY, [0, 500], [0, -30]);

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 bg-[#fafbf6] overflow-hidden">

      {/* Soft animated background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#878C53] blur-[140px] opacity-30 rounded-full"
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* LEFT CONTENT */}
          <div className="lg:w-[45%] z-10">

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-gray-900 mb-6 leading-[1.15]"
            >
              Create <span className="text-[#878C53]">Special Moments</span><br />
              for Your Event
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 mb-10"
            >
              From intimate gatherings to grand celebrations, we design unforgettable experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#878C53] text-white px-7 py-3 rounded-full flex items-center gap-2"
              >
                Book Now <PointerIcon />
              </motion.button>

              <button className="border border-[#878C53] text-[#878C53] px-7 py-3 rounded-full">
                Explore Services
              </button>
            </motion.div>
          </div>

          {/* RIGHT SIDE (PARALLAX IMAGES) */}
          <div className="lg:w-[55%] relative w-full h-[500px] md:h-[600px] mt-10 lg:mt-0">

            {/* BACK IMAGE */}
            <motion.div
              style={{ y: yBack }}
              className="absolute top-[15%] right-[-5%] w-[45%] h-[55%] rounded-3xl overflow-hidden shadow-lg"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* MAIN IMAGE */}
            <motion.div
              style={{ y: yMain }}
              className="absolute top-0 right-[15%] w-[65%] h-[85%] rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <motion.img
                whileHover={{ scale: 1.03 }}
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* FRONT FLOATING IMAGE */}
            <motion.div
              style={{ y: yFront }}
              animate={{ y: [0, -10, 0] }}   // floating effect
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[5%] left-[5%] w-[45%] h-[45%] rounded-t-[120px] rounded-b-3xl overflow-hidden shadow-2xl z-20 border-[8px] border-[#fafbf6]"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3"
                className="w-full h-full object-cover"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;