const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const con = mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = dbConnect;
