import Hall from "../models/Hall.js";

// GET all available halls
export const getHalls = async (req, res) => {
  try {
    const halls = await Hall.find({ isAvailable: true });
    res.status(200).json(halls);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// CREATE hall
export const createHall = async (req, res) => {
  try {
    const {
      name,
      capacity,
      pricePerHour,
      amenities,
      images,
      description,
    } = req.body;

    const hall = new Hall({
      name,
      capacity,
      pricePerHour,
      amenities,
      images,
      description,
    });

    await hall.save();

    res.status(201).json({
      msg: "Hall created successfully",
      data: hall,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};