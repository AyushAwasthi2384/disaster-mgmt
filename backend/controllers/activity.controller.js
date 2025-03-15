import { activityService } from "../services/activity.service.js";

export const createActivity = async (req, res) => {
  try {
    const { alert, title, description, type, leadBy, duration, status } =
      req.body;

    const activity = await activityService.createActivity({
      alert,
      title,
      description,
      type,
      leadBy,
      duration,
      status,
    });

    res
      .status(201)
      .json({ message: "Activity Created Successfully", activity });
  } catch (error) {
    console.error("Error in Creating Activity:", error);
    res.status(500).json({
      error: "An Unexpected Error Occurred While Creating The Activity",
    });
  }
};

export const readActivity = async (req, res) => {
  try {
    const activity = await activityService.readActivity(req.params.id);

    if (!activity) {
      return res.status(404).json({ error: "Activity Not Found" });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error("Error in Reading Activity:", error);
    res.status(500).json({
      error: "An Unexpected Error Occurred While Reading The Activity",
    });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const activity = await activityService.updateActivity(
      req.params.id,
      req.body
    );

    if (!activity) {
      return res.status(404).json({ error: "Activity Not Found" });
    }

    res
      .status(200)
      .json({ message: "Activity Updated Successfully", activity });
  } catch (error) {
    console.error("Error in Updating Activity:", error);
    res.status(500).json({
      error: "An Unexpected Error Occurred While Updating The Activity",
    });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const activity = await activityService.deleteActivity(req.params.id);

    if (!activity) {
      return res.status(404).json({ error: "Activity Not Found" });
    }

    res
      .status(200)
      .json({ message: "Activity Deleted Successfully", activity });
  } catch (error) {
    console.error("Error in Deleting Activity:", error);
    res.status(500).json({
      error: "An Unexpected Error Occurred While Deleting The Activity",
    });
  }
};
