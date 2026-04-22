import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation(); // 🔥 for active route

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Navigation items with paths
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 font-sans border-b border-gray-100 ${
        scrolled
          ? "bg-white shadow-md py-3"
          : "bg-white/95 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <nav className="flex justify-between items-center w-full">

          {/* Logo */}
          <div className="w-auto lg:w-1/4">
            <Link to="/" className="flex items-center gap-2">
              <svg className="w-10 h-10 text-[#878C53]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity="0.3"/>
                <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8z"/>
              </svg>
              <span className="text-2xl font-semibold text-gray-800 italic">
                Eventro
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center w-2/4">
            <ul className="flex items-center space-x-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`px-5 py-2 rounded-full font-medium transition-colors ${
                      location.pathname === item.path
                        ? "bg-[#878C53] text-white"
                        : "text-gray-600 hover:text-[#878C53]"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Buttons */}
          <div className="hidden lg:flex items-center justify-end gap-3 w-1/4">
            <button className="bg-[#878C53] text-white px-5 py-2.5 rounded-full hover:bg-[#6b6f42] transition text-sm">
              Book Now
            </button>

            
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-2xl text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3 border-t pt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-2 px-4 rounded-lg ${
                  location.pathname === item.path
                    ? "bg-[#878C53]/10 text-[#878C53]"
                    : "text-gray-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;