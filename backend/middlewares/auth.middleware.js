import jwt from "jsonwebtoken";
import process from "node:process";
import userModel from "../models/user.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

const authUser = async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
    return res.redirect("/login");
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized Access" });
    // return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded._id);

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
};

export default { authUser };
