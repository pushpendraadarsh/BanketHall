import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ---------------- Count Up Hook ---------------- */
const useCountUp = (end, duration = 1200) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = end / (duration / 16);

    const timer = setInterval(() => {
      start += step;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setValue(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return value;
};

const StatsSection = ({
  stats = [
    { value: 90, label: "Employees" },
    { value: 500, label: "Clients" },
    { value: 300, label: "Projects" },
    { value: 31, label: "Awards" },
  ],
}) => {

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
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
    <section className="relative py-28 text-white overflow-hidden">

      {/* 🟢 BIG ARCH BACKGROUND (whole section shape) */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1440 600"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="
              M0,600
              Q720,380 1440,600
              L1440,0 L0,0 Z
            "
            fill="#878C53"
          />
        </svg>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-4">

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center"
        >
          {stats.map((s, idx) => {
            const count = useCountUp(s.value);

            return (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ y: -6 }}
                className="flex flex-col items-center"
              >
                <div className="text-4xl md:text-5xl font-semibold tracking-tight">
                  {count}+
                </div>

                <div className="mt-2 text-sm md:text-base text-white/80">
                  {s.label}
                </div>

                <div className="w-14 h-[2px] bg-white/20 mt-3 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-white/70"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default StatsSection;