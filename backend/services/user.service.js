import UserModel from "../models/user.model.js";

const userService = {
  createUser: async ({ name, email, password, userRole }) => {
    if (!name || !email || !password || !userRole) {
      throw new Error("All fields Are Required To Enter by User");
    }

    const user = await UserModel.create({
      name,
      email,
      password,
      userRole,
    });

    return user;
  },
};

export { userService };
