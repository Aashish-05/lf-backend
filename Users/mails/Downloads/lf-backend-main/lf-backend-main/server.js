const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/items", require("./routes/items"));

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// test
app.get("/", (req, res) => {
  res.send("API running...");
});

// server
const PORT = process.env.PORT || 555;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});