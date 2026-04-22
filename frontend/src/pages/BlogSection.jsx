import React from "react";

const BlogSection = ({ blogPosts = [] }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Helpful <span className="text-[#878C53]">Insights</span>
          </h2>
          <p className="text-gray-600">
            From Concept to Execution, We Handle Every Detail
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h6 className="font-semibold mb-2 line-clamp-2">
                  {post.title}
                </h6>

                <p className="text-gray-500 text-sm line-clamp-2">
                  {post.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center">
          <button className="border border-[#878C53] text-[#878C53] px-8 py-3 rounded-full hover:bg-[#878C53] hover:text-white transition duration-300">
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;