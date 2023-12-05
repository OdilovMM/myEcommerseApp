const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

dbConnect();

app.use("/", (req, res) => {
  res.send("Hello from the server side!!!");
});

// registering router handlers
app.use("/api/user", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
