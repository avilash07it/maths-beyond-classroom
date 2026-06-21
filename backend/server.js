require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const pyqRoutes = require("./src/routes/pyq.routes");

app.use("/api/pyqs", pyqRoutes);

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