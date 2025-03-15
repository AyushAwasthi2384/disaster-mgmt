import userModel from "../models/user.model.js";

const userService = {
  createUser: async ({ name, email, password, userRole }) => {
    if (!name || !email || !password || !userRole) {
      throw new Error("All fields Are Required To Enter");
    }

    const user = await userModel.create({
      name,
      email,
      password,
      userRole,
    });

    return user;
  },
};

export { userService };
