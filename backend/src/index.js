require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db } = require("./config/firebaseAdmin");

const usersRoutes = require("./routes/users.routes");
const matchesRoutes = require("./routes/matches.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "HackMate backend is running",
  });
});

app.get("/health", async (req, res) => {
  try {
    await db.collection("users").limit(1).get();

    res.json({
      success: true,
      message: "Backend and Firestore are working",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.use("/api/users", usersRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
