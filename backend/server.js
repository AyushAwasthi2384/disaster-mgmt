import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("Backend OK!!"));
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
