import { alertService } from "../services/alert.service.js";

export const createAlert = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      latitude,
      longitude,
      priority,
      category,
      type,
    } = req.body;

    const alert = await alertService.createAlert({
      title,
      description,
      location,
      latitude,
      longitude,
      priority,
      category,
      type,
    });

    res.status(201).json({ message: "Alert Created Successfully", alert });
  } catch (error) {
    console.error("Error in Creating Alert:", error);
    res
      .status(500)
      .json({ error: "An Unexpected Error Occurred While Creating The Alert" });
  }
};

export const readAlert = async (req, res) => {
  try {
    const alert = await alertService.readAlert(req.params.id);

    if (!alert) {
      return res.status(404).json({ error: "Alert Not Found" });
    }

    res.status(200).json(alert);
  } catch (error) {
    console.error("Error in Reading Alert:", error);
    res
      .status(500)
      .json({ error: "An Unexpected Error Occurred While Reading The Alert" });
  }
};

export const updateAlert = async (req, res) => {
  try {
    const alert = await alertService.updateAlert(req.params.id, req.body);

    if (!alert) {
      return res.status(404).json({ error: "Alert Not Found" });
    }

    res.status(200).json({ message: "Alert Updated Successfully", alert });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAlert = async (req, res) => {
  try {
    const alert = await alertService.deleteAlert(req.params.id);

    if (!alert) {
      return res.status(404).json({ error: "Alert Not Found" });
    }

    res.status(200).json({ message: "Alert Deleted Successfully", alert });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
