const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./utils/db");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("Backend OK!!"));
app.use("/api/users", require("./routes/user.routes"));

app.use(errorHandler);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
