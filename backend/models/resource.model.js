import mongoose from "mongoose";

const resourceTypes = [
  "Food",
  "Water",
  "Medicine",
  "Clothing",
  "Shelter",
  "Fuel",
  "Equipment",
  "Other",
];

const ResourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    type: {
      type: String,
      required: true,
      enum: resourceTypes,
    },

    stock: { type: Number, required: true },

    sentTo: [
      {
        alert: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Alert",
          required: true,
        },
        activity: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Activity",
          required: true,
        },
        qty1: { type: Number, required: true },
      },
    ],

    isReceived: [
      {
        time: { type: Date, required: true },
        qty2: { type: Number, required: true },
      },
    ],

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ResourceSchema.methods.deleteResource = async function () {
  this.isDeleted = true;
  return this.save();
};

ResourceSchema.methods.updateResource = async function (newStock) {
  if (newStock < 0) {
    throw new Error("Stock Cannot Be in Negative");
  }
  this.stock = newStock;
  return this.save();
};

ResourceSchema.statics.getResourceByID = async function (id) {
  return this.findById(id).exec();
};

ResourceSchema.statics.getResourcesByType = async function (type) {
  if (!resourceTypes.includes(type)) {
    throw new Error("Invalid resource type");
  }
  return this.find({ type, isDeleted: false }).exec();
};

ResourceSchema.statics.createResource = async function (data) {
  const resource = new this(data);
  return resource.save();
};

export default mongoose.model("Resource", ResourceSchema);
