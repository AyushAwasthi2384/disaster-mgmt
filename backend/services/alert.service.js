import AlertSchema from "../models/alert.model.js";

const alertService = {
  createAlert: async ({
    title,
    description,
    location,
    latitude,
    longitude,
    priority,
    category,
    type,
  }) => {
    if (
      !title ||
      !description ||
      !location ||
      !latitude ||
      !longitude ||
      !priority ||
      !category ||
      !type
    ) {
      throw new Error("All Fields Are Required To Enter By Body");
    }

    const alert = await AlertSchema.create({
      title,
      description,
      location,
      coordinates: { latitude, longitude },
      priority,
      status: "New",
      category,
      type,
    });

    return alert;
  },
  
  readAlert: async (id) => {
    if (!id) {
      throw new Error("ID is Required To Read An Alert");
    }

    const alert = await AlertSchema.findById(id);

    if (!alert) {
      throw new Error("Alert Not Found");
    }

    return alert;
  },

  updateAlert: async (id, updateData) => {
    if (!id) {
      throw new Error("ID is Required To Update An Alert");
    }

    const alert = await AlertSchema.findById(id);

    if (!alert) {
      throw new Error("Alert Not Found");
    }

    Object.assign(alert, updateData);
    await alert.save();

    return alert;
  },

  deleteAlert: async (id) => {
    if (!id) {
      throw new Error("ID is Required To Delete An Alert");
    }

    const alert = await AlertSchema.findById(id);

    if (!alert) {
      throw new Error("Alert Not Found");
    }

    alert.isDeleted = true;
    await alert.save();

    return alert;
  },
};

export { alertService };
