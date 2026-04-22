import Hall from '../models/Hall.js';

export const getHalls = async (req, res) => {
  try {
    const halls = await Hall.find({ isAvailable: true });
    res.json(halls);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const createHall = async (req, res) => {
  const { name, capacity, pricePerHour, amenities, images, description } = req.body;
  try {
    const hall = new Hall({ name, capacity, pricePerHour, amenities, images, description });
    await hall.save();
    res.json(hall);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// TODO: updateHall, deleteHall (admin only)

