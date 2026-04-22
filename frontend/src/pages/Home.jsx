import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import BlogSection from './BlogSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import GallerySection from './GallerySection';
import StatsSection from './StatsSection';
import PricingSection from './PricingSection';
import ContactSection from '../components/ContactSection';
import TestimonialsSection from './TestimonialsSection';
import HeroSection from './HeroSection';


const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Samantha Blake",
      role: "Project Coordinator",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "Working with AuraAffairs was a game changer for our wedding! From the initial consultation to the big day, their attention to detail and creativity made everything seamless. Our guests were amazed by the decor and flow of the event. We felt completely taken care of!"
    },
    {
      name: "Taylor Smith",
      role: "Team Supervisor",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "I can't thank the team at AuraAffairs enough for their incredible work on our corporate retreat. They took our vision and turned it into a reality, managing everything from logistics to the perfect venue. The feedback from our attendees was overwhelmingly positive!"
    },
    {
      name: "Michael Chen",
      role: "CEO, TechCorp",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      text: "Professional, creative, and extremely organized. The team exceeded our expectations for our annual gala. Every detail was perfect, and our guests are still talking about it months later. Highly recommended!"
    }
  ];

  const services = [
    { title: "Wedding Planning", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop", desc: "Your Dream Wedding, Perfectly Planned" },
    { title: "Fine Dining", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop", desc: "Exquisite Culinary Experiences" },
    { title: "Corporate Event Decor", image: "https://images.unsplash.com/photo-1515187029135-8ee8e6cbfd23?w=400&h=300&fit=crop", desc: "Professional & Elegant Setup" },
    { title: "Dinner Planning", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop", desc: "Intimate & Memorable Evenings" }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1532712931348-03fc1f3e4951?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1477901492169-d59e6428fc90?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop"
  ];

  const pricingPlans = [
    {
      name: "Basic Package",
      price: "$500",
      features: [
        "Consultation and concept development",
        "Basic event timeline creation",
        "On-site coordination (up to 8 hours)"
      ],
      excluded: [
        "Detailed event timeline and checklist",
        "Access to preferred vendor discount",
        "Budget management assistance",
        "On-site event management (full day)",
        "Full-service event planning"
      ]
    },
    {
      name: "Standard Package",
      price: "$1200",
      features: [
        "Consultation and concept development",
        "Basic event timeline creation",
        "On-site coordination (up to 8 hours)",
        "Detailed event timeline and checklist",
        "Access to preferred vendor discount",
        "Budget management assistance"
      ],
      excluded: [
        "On-site event management (full day)",
        "Full-service event planning"
      ]
    },
    {
      name: "Premium Package",
      price: "$2500",
      features: [
        "Consultation and concept development",
        "Basic event timeline creation",
        "On-site coordination (up to 8 hours)",
        "Detailed event timeline and checklist",
        "Access to preferred vendor discount",
        "Budget management assistance"
      ],
      excluded: [
        "On-site event management (full day)",
        "Full-service event planning"
      ]
    },
    {
      name: "Corporate Package",
      price: "$3000",
      features: [
        "Consultation and concept development",
        "Basic event timeline creation",
        "On-site coordination (up to 8 hours)",
        "Detailed event timeline and checklist",
        "Access to preferred vendor discount",
        "Budget management assistance",
        "On-site event management (full day)",
        "Full-service event planning"
      ],
      excluded: []
    }
  ];

  const blogPosts = [
    { title: "Embracing Sustainability: How to Plan Eco-Friendly Events", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop", desc: "Our solar panels provide optimal energy efficiency, ensuring maximum output for your home." },
    { title: "Top 10 Tips for a Flawless Wedding Planning Experience", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=250&fit=crop", desc: "Crafting your dream wedding with precision and care, we ensure every detail is perfectly planned." },
    { title: "The Ultimate Checklist for Stress-Free Wedding Planning", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=250&fit=crop", desc: "From venue selection to floral arrangements, we handle every detail to create your perfect wedding day." },
    { title: "Creating Unforgettable Memories: A Guide to Private Party Planning", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=250&fit=crop", desc: "Transforming your vision into reality, we meticulously plan every aspect of your dream wedding." }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Preloader Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .hover-grow:hover { transform: scale(1.05); transition: transform 0.3s ease; }
      `}</style>

      {/* Header Navigation */}
      {/* <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-md py-4'}`}>
        <div className="container mx-auto px-4 md:px-8">
          <nav className="flex justify-between items-center">
            <a href="#" className="flex items-center">
              <img src="https://placehold.co/160x50/F3F4EC/878C53?text=EVENTRO" alt="Logo" className="h-10" />
            </a>
            
            <div className="hidden lg:flex items-center space-x-8">
              <ul className="flex space-x-8">
                {['Home', 'About Us', 'Services', 'Blogs', 'Contact Us'].map((item) => (
                  <li key={item}><a href="#" className="text-gray-700 hover:text-[#878C53] transition">{item}</a></li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                <button className="bg-[#878C53] text-white px-6 py-2 rounded-full hover:bg-[#6b6f42] transition flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M16.5616 6.65086C16.2751 6.65086 16.0032 6.71426 15.7585 6.82695C15.5625 5.97152 14.7957 5.33125 13.8817 5.33125C13.5888 5.33125 13.3111 5.39723 13.0623 5.51469C12.8427 4.69273 12.0919 4.08543 11.2017 4.08543C10.9342 4.08543 10.6793 4.14035 10.4476 4.23934V1.92594C10.4476 0.863945 9.58369 0 8.5217 0C7.4597 0 6.59572 0.863945 6.59572 1.92594V11.0899L5.60267 9.61578L5.58713 9.59645C4.84361 8.67215 3.53553 8.46676 2.54455 9.11875C2.02635 9.45965 1.67529 9.98258 1.55599 10.5912C1.43744 11.1962 1.56287 11.8092 1.90916 12.3186L5.45326 17.9051L5.46506 17.923C6.35834 19.2235 7.83361 20 9.41138 20H13.3881C16.1999 20 18.4876 17.7124 18.4876 14.9005V8.57676C18.4876 7.5148 17.6236 6.65086 16.5616 6.65086Z" fill="white"/></svg>
                  Book Now
                </button>
                <button className="border border-[#878C53] text-[#878C53] px-6 py-2 rounded-full hover:bg-[#878C53] hover:text-white transition">
                  Contact Us
                </button>
              </div>
            </div>

            <button className="lg:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              ☰
            </button>
          </nav>

          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-3">
              {['Home', 'About Us', 'Services', 'Blogs', 'Contact Us'].map((item) => (
                <a key={item} href="#" className="block text-gray-700 py-2">{item}</a>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <button className="bg-[#878C53] text-white px-6 py-2 rounded-full">Book Now</button>
                <button className="border border-[#878C53] text-[#878C53] px-6 py-2 rounded-full">Contact Us</button>
              </div>
            </div>
          )}
        </div>
      </header> */}

      {/* Hero Section */}
      {/* <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-[#F3F4EC] to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 animate-fadeInUp">
              <img src="https://placehold.co/100x20/F3F4EC/878C53?text=✦" alt="" className="mb-6" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                Create <span className="text-[#878C53]">Special Moments</span> for Your Event
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                From intimate gatherings to grand celebrations, we design unforgettable experiences tailored to your vision. Let us turn your dreams into reality!
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#878C53] text-white px-8 py-3 rounded-full hover:bg-[#6b6f42] transition flex items-center gap-2">
                  Book Now →
                </button>
                <button className="border border-[#878C53] text-[#878C53] px-8 py-3 rounded-full hover:bg-[#878C53] hover:text-white transition">
                  Explore Services
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=500&fit=crop" alt="Event" className="rounded-2xl shadow-xl w-full h-64 object-cover" />
                <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=500&fit=crop" alt="Event" className="rounded-2xl shadow-xl w-full h-80 object-cover mt-8" />
                <img src="https://images.unsplash.com/photo-1532712931348-03fc1f3e4951?w=400&h=300&fit=crop" alt="Event" className="rounded-2xl shadow-xl w-full h-48 object-cover -mt-4" />
              </div>
            </div>
          </div>
        </div>
      </section> */}
       
      <HeroSection/>

      {/* About Section */}
     <AboutSection/>

      {/* Services Section */}
      <ServicesSection services={services} />;

      {/* Gallery Section */}
      <GallerySection galleryImages={galleryImages} />;

      {/* Counter Section */}
      <StatsSection/>

      {/* Pricing Section */}
      <PricingSection pricingPlans={pricingPlans} />;

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />;

      {/* Contact Section */}
      <ContactSection/>

      {/* Blog Section */}
      <BlogSection blogPosts={blogPosts} />;

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Home;