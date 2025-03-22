import ResourceSchema from "../models/resource.model.js";

const resourceService = {
  createResource: async ({ title, type, stock, sentTo, isReceived }) => {
    if (!title || !type || !stock) {
      throw new Error("All Fields Are Required To Enter By Body.");
    }

    const resource = await ResourceSchema.create({
      title,
      type,
      stock,
      sentTo: sentTo || [],
      isReceived: isReceived || [],
      isDeleted: false,
    });

    return resource;
  },

  readResource: async (id) => {
    if (!id) {
      throw new Error("ID is Required to Read a Resource.");
    }

    const resource = await ResourceSchema.findById(id);

    if (!resource) {
      throw new Error("Resource Not Found.");
    }

    return resource;
  },

  updateResource: async (id, updateData) => {
    if (!id) {
      throw new Error("ID is Required to Update a Resource.");
    }

    const resource = await ResourceSchema.findById(id);

    if (!resource) {
      throw new Error("Resource Not Found.");
    }

    Object.assign(resource, updateData);
    await resource.save();

    return resource;
  },

  deleteResource: async (id) => {
    if (!id) {
      throw new Error("ID is Required to Delete a Resource.");
    }

    const resource = await ResourceSchema.findById(id);

    if (!resource) {
      throw new Error("Resource Not Found.");
    }

    resource.isDeleted = true;
    await resource.save();

    return resource;
  },
};

export { resourceService };
