import cron from "node-cron";
import Event from "../models/Event.js";
import Opportunity from "../models/Opportunity.js";

const cleanupExpiredData = () => {
  // Runs every day at midnight
  cron.schedule("0 0 * * *", async () => {
    try {
      const today = new Date();

      await Event.deleteMany({ endDate: { $lt: today } });
      await Opportunity.deleteMany({ closingDate: { $lt: today } });

      console.log("Expired events & opportunities deleted");
    } catch (error) {
      console.error("Cleanup error:", error.message);
    }
  });
};

export default cleanupExpiredData;