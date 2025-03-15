import mongoose from "mongoose";

const categories = [
  "ExCavation",
  "Resources",
  "Cremation",
  "Search and Rescue",
  "Medical Assistance",
  "Shelter and Housing",
  "Food and Water Supply",
  "Communication and Coordination",
  "Logistics and Transportation",
  "Security and Law Enforcement",
  "Disaster Recovery",
  "Early Warning Systems",
  "Community Preparedness",
  "First Aid and Emergency Medical Teams",
  "Evacuation and Relocation",
];

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

const status = [
  "New",
  "On Going",
  "Completed",
  "Under Control",
  "Resolved",
  "Mitigation",
  "Evacuating",
  "Recovery",
  "Rebuilding",
  "StandBy",
  "AssistanceNeeded",
  "Investigating",
];

const AlertSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },

    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },

    priority: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 3,
    },

    status: {
      type: String,
      required: true,
      enum: status,
      default: "New",
    },

    isDeleted: { type: Boolean, default: false },

    category: {
      type: String,
      required: true,
      enum: categories,
    },

    type: {
      type: String,
      required: true,
      enum: types,
    },
  },
  { timestamps: true }
);

AlertSchema.methods.deleteAlert = async function () {
  this.isDeleted = true;
  return this.save();
};

AlertSchema.methods.updateStatus = async function (newStatus) {
  if (status.includes(newStatus)) {
    this.status = newStatus;
    return this.save();
  } else {
    throw new Error("Invalid Status Entered");
  }
};

export default mongoose.model("Alert", AlertSchema);
