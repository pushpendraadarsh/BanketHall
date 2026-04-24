import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuData = {
  Starters: [
    "Veg Spring Rolls",
    "Paneer Tikka",
    "Chicken Tikka",
    "Hara Bhara Kebab",
    "Crispy Corn",
  ],
  "Main Course (Veg)": [
    "Paneer Butter Masala",
    "Dal Makhani",
    "Shahi Paneer",
    "Veg Biryani",
    "Butter Naan",
  ],
  "Main Course (Non-Veg)": [
    "Butter Chicken",
    "Chicken Curry",
    "Chicken Biryani",
    "Mutton Rogan Josh",
  ],
  Desserts: [
    "Gulab Jamun",
    "Ice Cream",
    "Brownie",
    "Rasgulla",
  ],
  Beverages: [
    "Soft Drinks",
    "Fresh Juice",
    "Mocktails",
    "Tea / Coffee",
  ],
};

const MenuSection = () => {
  const [active, setActive] = useState("Starters");

  return (
    <section className="py-20 bg-[#F3F4EC]">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our <span className="text-[#878C53]">Menu</span>
          </h2>
          <p className="text-gray-600">
            A perfect blend of taste and elegance for your events
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.keys(menuData).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm transition ${
                active === cat
                  ? "bg-[#878C53] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="grid md:grid-cols-2 gap-4">
                {menuData[active].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="text-[#878C53]">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default MenuSection;