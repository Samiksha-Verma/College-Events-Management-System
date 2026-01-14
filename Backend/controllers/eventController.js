import Event from "../models/Event.js";

// Get all events (User + Admin)
export const getAllEvents = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Event.countDocuments();
    const events = await Event.find()
      .sort({ endDate: 1 })
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      events,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add event (Admin only)
export const addEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ message: "Event added successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete event (Admin only)
export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};