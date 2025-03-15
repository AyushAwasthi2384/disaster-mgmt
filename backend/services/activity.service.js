import ActivitySchema from "../models/activity.model.js";

const activityService = {
  createActivity: async ({
    alert,
    title,
    description,
    type,
    leadBy,
    duration,
  }) => {
    if (!alert || !title || !description || !type || !leadBy || !duration) {
      throw new Error("All Fields Are Required To Enter By Body");
    }

    const activity = await ActivitySchema.create({
      alert,
      title,
      description,
      type,
      leadBy,
      duration,
      status: "New",
    });

    return activity;
  },

  readActivity: async (id) => {
    if (!id) {
      throw new Error("ID is Required To Read An Activity");
    }

    const activity = await ActivitySchema.findById(id);

    if (!activity) {
      throw new Error("Activity Not Found");
    }

    return activity;
  },

  updateActivity: async (id, updateData) => {
    if (!id) {
      throw new Error("ID is Required To Update An Activity");
    }

    const activity = await ActivitySchema.findById(id);

    if (!activity) {
      throw new Error("Activity Not Found");
    }

    Object.assign(activity, updateData);
    await activity.save();

    return activity;
  },

  deleteActivity: async (id) => {
    if (!id) {
      throw new Error("ID is Required To Delete An Activity");
    }

    const activity = await ActivitySchema.findById(id);

    if (!activity) {
      throw new Error("Activity Not Found");
    }

    await activity.deleteOne();

    return activity;
  },
};

export { activityService };
