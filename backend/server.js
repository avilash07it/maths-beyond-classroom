require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./src/routes/auth.routes");
const pyqRoutes = require("./src/routes/pyq.routes");
const potdRoutes = require("./src/routes/potd.routes");
const lectureRoutes = require("./src/routes/lecture.routes");
const mockTestRoutes = require("./src/routes/mocktest.routes");
const materialRoutes = require("./src/routes/material.routes");

app.use("/api/auth", authRoutes);
app.use("/api/pyqs", pyqRoutes);
app.use("/api/potd", potdRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/mock-tests", mockTestRoutes);
app.use("/api/materials", materialRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "MBC Backend Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});