const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const con = mongoose.connect("mongodb://localhost:27017/shopme");
    console.log("MongoDB connected successfully");
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = dbConnect;
