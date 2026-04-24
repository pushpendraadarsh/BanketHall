import React from "react";
import { motion } from "framer-motion";

const GallerySection = ({ galleryImages = [] }) => {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 bg-white overflow-hidden">
      <div className="container mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Events <span className="text-[#878C53]">Gallery</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            From Concept to Execution, We Handle Every Detail
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12"
        >

          {/* LEFT COLUMN */}
          <div className="space-y-4 sm:space-y-6">
            {[0, 1].map((i) => (
              <motion.img
                key={i}
                src={galleryImages[i]}
                alt={`Gallery ${i + 1}`}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl w-full h-52 sm:h-64 object-cover shadow-md cursor-pointer"
              />
            ))}
          </div>

          {/* MIDDLE COLUMN */}
          <div className="space-y-4 sm:space-y-6">
            {[2, 3].map((i) => (
              <motion.img
                key={i}
                src={galleryImages[i]}
                alt={`Gallery ${i + 1}`}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl w-full h-44 sm:h-56 object-cover shadow-md cursor-pointer"
              />
            ))}
          </div>

          {/* RIGHT BIG IMAGE */}
          <motion.img
            src={galleryImages[4]}
            alt="Gallery 5"
            variants={item}
            whileHover={{ scale: 1.03 }}
            className="rounded-xl w-full h-64 sm:h-80 lg:h-full object-cover shadow-md cursor-pointer"
          />

        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto border border-[#878C53] text-[#878C53] px-6 sm:px-8 py-3 rounded-full hover:bg-[#878C53] hover:text-white transition duration-300"
          >
            View More
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default GallerySection;