import React from "react";

const BlogSection = ({ blogPosts = [] }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 bg-white">
      <div className="container mx-auto">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Helpful <span className="text-[#878C53]">Insights</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            From Concept to Execution, We Handle Every Detail
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 sm:mb-12">

          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-44 sm:h-48 object-cover"
              />

              <div className="p-4 sm:p-5">
                <h6 className="font-semibold mb-2 line-clamp-2 text-sm sm:text-base">
                  {post.title}
                </h6>

                <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
                  {post.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center">
          <button className="w-full sm:w-auto border border-[#878C53] text-[#878C53] px-6 sm:px-8 py-3 rounded-full hover:bg-[#878C53] hover:text-white transition duration-300">
            View More
          </button>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;