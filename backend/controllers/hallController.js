import Hall from "../models/Hall.js";

// GET HALLS
export const getHalls = async (req, res) => {
  try {
    const halls = await Hall.find({ isAvailable: true });
    res.status(200).json(halls);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// CREATE HALL (FIXED)
export const createHall = async (req, res) => {
  try {
    const hall = new Hall({
      name: req.body.name,
      capacity: req.body.capacity,
      pricePerHour: req.body.pricePerHour,
      description: req.body.description,
      images: req.file ? [req.file.filename] : [], // 🔥 IMPORTANT
    });

    await hall.save();
    res.json(hall);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create hall" });
  }
};