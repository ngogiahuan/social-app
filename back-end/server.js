require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRouter = require("./routers/authRouter");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api", authRouter);

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
