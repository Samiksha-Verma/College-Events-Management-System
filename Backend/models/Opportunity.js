import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      trim: true,
    },
    closingDate: {
      type: Date,
      required: true,
    },
    registrationLink: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

export default Opportunity;