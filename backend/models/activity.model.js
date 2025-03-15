import mongoose from "mongoose";

const types = [
  "LandSlide",
  "Flood",
  "Earthquake",
  "Cyclone",
  "Tornado",
  "Wildfire",
  "Hurricane",
  "Drought",
  "Tsunami",
  "Heatwave",
  "Pandemic",
  "Chemical Spill",
  "Nuclear Accident",
  "Terrorist Attack",
];

const status = ["New", "OnGoing", "Completed"];

const ActivitySchema = new mongoose.Schema(
  {
    alert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alert",
      required: true,
    },

    title: { type: String, required: true },

    description: { type: String, required: true },
    
    type: {
      type: String,
      required: true,
      enum: types,
    },

    leadBy: { type: String, required: true },

    duration: { type: Number, required: true },

    status: {
      type: String,
      required: true,
      enum: status,
      default: "New",
    },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ActivitySchema.methods.deleteActivity = async function () {
  this.isDeleted = true;
  return this.save();
};

ActivitySchema.methods.updateStatus = async function (newStatus) {
  if (status.includes(newStatus)) {
    this.status = newStatus;
    return this.save();
  } else {
    throw new Error("Invalid Status Entered");
  }
};

export default mongoose.model("Activity", ActivitySchema);
