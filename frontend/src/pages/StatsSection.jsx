import React from "react";

const StatsSection = ({
  stats = [
    { value: "90", label: "Employees" },
    { value: "500+", label: "Clients" },
    { value: "300+", label: "Projects" },
    { value: "31", label: "Awards" },
  ],
}) => {
  return (
    <section className="py-16 bg-[#878C53] text-white">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((item, idx) => (
            <div key={idx}>
              <div className="text-4xl font-bold">
                {item.value}
              </div>
              <div className="mt-1 text-sm md:text-base">
                {item.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;