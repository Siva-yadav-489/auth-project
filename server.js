const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });

app.get("/", (req, res) => {
  res.send("home route working");
});

app.use("/", userRoute);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
