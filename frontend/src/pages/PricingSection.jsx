import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PricingSection = ({ pricingPlans = [] }) => {
  const [mode, setMode] = useState("event"); // event | monthly

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-20 bg-[#F3F4EC]">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Our <span className="text-[#878C53]">Pricing</span>
          </h2>
          <p className="text-gray-600">
            Flexible plans for every type of event
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1 rounded-full shadow flex">
            
            <button
              onClick={() => setMode("event")}
              className={`px-6 py-2 rounded-full text-sm transition ${
                mode === "event"
                  ? "bg-[#878C53] text-white"
                  : "text-gray-600"
              }`}
            >
              Per Event
            </button>

            <button
              onClick={() => setMode("monthly")}
              className={`px-6 py-2 rounded-full text-sm transition ${
                mode === "monthly"
                  ? "bg-[#878C53] text-white"
                  : "text-gray-600"
              }`}
            >
              Monthly
            </button>

          </div>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pricingPlans.map((plan, idx) => {
            const isPopular = idx === 1;

            const price =
              mode === "event"
                ? plan.price
                : plan.monthlyPrice || plan.price;

            return (
              <motion.div
                key={idx}
                variants={card}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-white rounded-xl p-6 shadow-lg transition ${
                  isPopular ? "border-2 border-[#878C53]" : ""
                }`}
              >

                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-3 right-4 bg-[#878C53] text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Glow for featured */}
                {isPopular && (
                  <div className="absolute inset-0 bg-[#878C53]/10 blur-2xl opacity-40 -z-10 rounded-xl"></div>
                )}

                {/* Title */}
                <h6 className="font-semibold text-lg mb-2">
                  {plan.name}
                </h6>

                <p className="text-gray-500 text-sm mb-4">
                  Ideal for individuals who need features and tools for client work.
                </p>

                {/* Price (animated switch) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={price}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-baseline mb-4"
                  >
                    <span className="text-3xl font-bold">
                      {price}
                    </span>
                    <span className="text-gray-500 ml-1">
                      / {mode === "event" ? "Event" : "Month"}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#878C53] text-white py-2 rounded-full mb-6 hover:bg-[#6b6f42] transition"
                >
                  Choose Plan
                </motion.button>

                {/* Features */}
                <div className="space-y-2">
                  {plan.features?.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-[#878C53]">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}

                  {plan.excluded?.map((excluded, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm opacity-50"
                    >
                      <span>✗</span>
                      <span className="line-through">{excluded}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default PricingSection;