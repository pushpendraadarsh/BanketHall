import React, { useState } from "react";

const ContactSection = ({
  image = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=500&fit=crop",
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if (!formData.email || !formData.message) {
      alert("Please fill required fields");
      return;
    }

    console.log("Form Data:", formData);

    // TODO: connect API here
    // await axios.post('/contact', formData)

    alert("Message sent successfully!");

    // reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      agree: false,
    });
  };

  return (
    <section className="py-20 bg-[#F3F4EC]">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Get <span className="text-[#878C53]">Help</span>
          </h2>
          <p className="text-gray-600">
            From Concept to Execution, We Handle Every Detail
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Form */}
          <div className="lg:w-1/2 bg-white rounded-2xl p-8 shadow-lg">
            <h4 className="text-2xl font-semibold mb-2">Get In Touch</h4>
            <p className="text-gray-500 mb-8">
              Our friendly team would like to hear from you!
            </p>

            <form onSubmit={handleSubmit}>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3"
                    placeholder="e.g John"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3"
                    placeholder="e.g Doe"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="sample@mail.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Your Message Here"
                />
              </div>

              <div className="flex items-center gap-2 mb-6">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                />
                <label htmlFor="agree" className="text-sm">
                  I agree to receiving promotional updates.
                </label>
              </div>

              <button
                type="submit"
                className="bg-[#878C53] text-white px-8 py-3 rounded-full hover:bg-[#6b6f42] transition"
              >
                Submit
              </button>

            </form>
          </div>

          {/* Image */}
          <div className="lg:w-1/2">
            <img
              src={image}
              alt="Contact"
              className="rounded-2xl w-full h-full object-cover shadow-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;