import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#f4f5f0] text-gray-700 pt-16 pb-8 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* Replace with your actual logo image */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#3d4224] flex items-center gap-2">
                <svg className="w-8 h-8 text-[#878C53]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                Eventro
              </span>
            </div>
          </div>

          {/* Tagline */}
          <div className="lg:w-1/4">
            <p className="text-gray-800 font-medium">
              Weekly Insurance Tips<br /> directly in your inbox
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="flex flex-col w-full lg:w-auto">
            <label className="text-xs text-gray-500 mb-1">Email</label>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <input
                type="email"
                placeholder="yourmail@mail.com"
                className="bg-transparent border-b border-gray-300 pb-2 w-full sm:w-64 text-gray-800 placeholder-gray-400 outline-none focus:border-[#878C53] transition-colors"
              />
              <button className="bg-[#878C53] text-white px-6 py-2.5 rounded-full hover:bg-[#6b6f42] transition flex items-center gap-2 whitespace-nowrap">
                Submit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Middle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Information */}
          <div>
            <h6 className="font-semibold text-gray-900 mb-6 inline-block border-b-2 border-[#878C53] pb-1">
              Information
            </h6>
            <div className="space-y-4 text-sm text-gray-600">
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#878C53] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                216 Main Boulevard, New York City
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#878C53]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                +123 (4567) -890
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#878C53]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                support@trustInsure.com
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {[
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />, // Mail
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />, // Facebook
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />, // Web/Dribbble approx
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /> // Telegram approx
              ].map((iconPath, index) => (
                <a key={index} href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 text-gray-500 hover:border-[#878C53] hover:text-[#878C53] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {iconPath}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h6 className="font-semibold text-gray-900 mb-6 inline-block border-b-2 border-[#878C53] pb-1">
              Our Services
            </h6>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[#878C53] transition-colors">Wedding Planning</a></li>
              <li><a href="#" className="hover:text-[#878C53] transition-colors">Flower Decor</a></li>
              <li><a href="#" className="hover:text-[#878C53] transition-colors">Dinning Events</a></li>
              <li><a href="#" className="hover:text-[#878C53] transition-colors">Event Decoration</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="font-semibold text-gray-900 mb-6 inline-block border-b-2 border-[#878C53] pb-1">
              Quick Links
            </h6>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[#878C53] transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-[#878C53] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#878C53] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#878C53] transition-colors">Blogs</a></li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h6 className="font-semibold text-gray-900 mb-6 inline-block border-b-2 border-[#878C53] pb-1">
              Working Hours
            </h6>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#878C53] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                  <p className="font-medium text-gray-800">09:00 am - 05:00 pm</p>
                  <p>Monday - Thursday</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#878C53] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                  <p className="font-medium text-gray-800">12:00 am - 09:00 pm</p>
                  <p>Friday - Saturday</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center pt-8 mt-4 text-sm text-gray-500">
          © 2026. All rights reserved by UI Paradox
        </div>
      </div>
    </footer>
  );
};

export default Footer;