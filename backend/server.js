import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import alertRoutes from "./routes/alert.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import resourceRoutes from "./routes/resource.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => res.send("Backend OK!!"));
app.use("/api/users", userRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/resource", resourceRoutes);

app.use(errorHandler);

app.listen(5000, () =>
  console.log("✅ Server running on http://localhost:5000")
);
