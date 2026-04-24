import React, { useState, useEffect } from "react";

import Footer from "../components/Footer";
import BlogSection from "./BlogSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import GallerySection from "./GallerySection";
import StatsSection from "./StatsSection";
import PricingSection from "./PricingSection";
import MapSection from "./MapSection";
import ContactSection from "../components/ContactSection";
import TestimonialsSection from "./TestimonialsSection";
import HeroSection from "./HeroSection";
import EnquiryForm from "./EnquiryForm";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // ✅ FIX: missing state
  const [showEnquiry, setShowEnquiry] = useState(false);

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
      price: "500",
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
      price: "1200",
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
      price: "2500",
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
      price: "3000",
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

  /* ---------------- SCROLL ---------------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- TESTIMONIAL AUTO ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  /* ---------------- ENQUIRY POPUP ---------------- */
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const alreadyShown = localStorage.getItem("enquiryShown");

  //     if (!alreadyShown) {
  //       setShowEnquiry(true);
  //       localStorage.setItem("enquiryShown", "true");
  //     }
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="min-h-screen bg-white">

      <HeroSection />
      <AboutSection />
      <ServicesSection services={services} />
      <GallerySection galleryImages={galleryImages} />
      <StatsSection />
      <PricingSection pricingPlans={pricingPlans} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
      <MapSection />
      <BlogSection blogPosts={blogPosts} />
      <Footer />
      <EnquiryForm />

      {/* ================= ENQUIRY POPUP ================= */}
      {showEnquiry && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]"
          onClick={() => setShowEnquiry(false)}   // click outside closes
        >
          <div
            className="relative w-full max-w-xl mx-4"
            onClick={(e) => e.stopPropagation()} // prevent close on form click
          >
            {/* close button */}
            <button
              onClick={() => setShowEnquiry(false)}
              className="absolute -top-3 -right-3 bg-white w-10 h-10 rounded-full shadow flex items-center justify-center"
            >
              ✕
            </button>

            <EnquiryForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;