import Opportunity from "../models/Opportunity.js";

// Get all opportunities (User + Admin)
export const getAllOpportunities = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Opportunity.countDocuments();
    const opportunities = await Opportunity.find()
      .sort({ closingDate: 1 })
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      opportunities,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add opportunity (Admin only)
export const addOpportunity = async (req, res) => {
  try {
    const { registrationLink } = req.body;

    // ✅ LINK VALIDATION (IMPORTANT)
    if (
      !registrationLink ||
      (!registrationLink.startsWith("http://") &&
        !registrationLink.startsWith("https://"))
    ) {
      return res.status(400).json({
        message:
          "Registration link must start with http:// or https://",
      });
    }

    const opportunity = await Opportunity.create(req.body);

    res.status(201).json({
      message: "Opportunity added successfully",
      opportunity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete opportunity (Admin only)
export const deleteOpportunity = async (req, res) => {
  try {
    await Opportunity.findByIdAndDelete(req.params.id);
    res.json({ message: "Opportunity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};