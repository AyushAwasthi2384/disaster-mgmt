import { resourceService } from "../services/resource.service.js";

export const createResource = async (req, res) => {
  try {
    const { title, type, stock, sentTo, isReceived } = req.body;

    const resource = await resourceService.createResource({
      title,
      type,
      stock,
      sentTo,
      isReceived,
    });

    res
      .status(201)
      .json({ message: "Resource Created Successfully", resource });
  } catch (error) {
    console.error("Error in Creating Resource:", error);
    res.status(500).json({
      error: "An Unexpected Error Occurred While Creating The Resource",
    });
  }
};

export const readResource = async (req, res) => {
  try {
    const resource = await resourceService.readResource(req.params.id);

    if (!resource) {
      return res.status(404).json({ error: "Resource Not Found" });
    }

    res.status(200).json(resource);
  } catch (error) {
    console.error("Error in Reading Resource:", error);
    res.status(500).json({
      error: "An Unexpected Error Occurred While Reading The Resource",
    });
  }
};

export const updateResource = async (req, res) => {
  try {
    const resource = await resourceService.updateResource(
      req.params.id,
      req.body
    );

    if (!resource) {
      return res.status(404).json({ error: "Resource Not Found" });
    }

    res
      .status(200)
      .json({ message: "Resource Updated Successfully", resource });
  } catch (error) {
    console.error("Error in Updating Resource:", error);
    res.status(500).json({
      error: "An Unexpected Error Occurred While Updating The Resource",
    });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await resourceService.deleteResource(req.params.id);

    if (!resource) {
      return res.status(404).json({ error: "Resource Not Found" });
    }

    res
      .status(200)
      .json({ message: "Resource Deleted Successfully", resource });
  } catch (error) {
    console.error("Error in Deleting Resource:", error);
    res.status(500).json({
      error: "An Unexpected Error Occurred While Deleting The Resource",
    });
  }
};
