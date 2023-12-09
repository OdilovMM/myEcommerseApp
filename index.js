var bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const authRouter = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

dbConnect();

app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// registering router handlers
app.use("/api/user", authRouter);





// error handler middleware
app.use(notFound)
app.use(errorHandler)




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
