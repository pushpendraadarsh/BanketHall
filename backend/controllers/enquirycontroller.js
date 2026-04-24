import Enquiry from "../models/enquiry.js";

// CREATE enquiry
export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, eventType, date, message } = req.body;

    if (!name || !email || !phone || !eventType || !date) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      eventType,
      date,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Create Enquiry Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET all enquiries (for admin)
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("Get Enquiries Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// DELETE enquiry (optional)
export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    await Enquiry.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Enquiry deleted",
    });
  } catch (error) {
    console.error("Delete Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};