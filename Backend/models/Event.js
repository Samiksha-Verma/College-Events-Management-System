import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    registrationLink: {
      type: String,
      required: true,
    },
    organizerName: {
      type: String,
      required: true,
    },
    clubName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;