/* eslint-disable no-undef */
const express = require("express");
const app = express();
const pingRoutes = require("./api/v1/routes/PingRoutes");
const accountRoutes = require("./api/v1/routes/AccountRoutes");
const linkRoutes = require("./api/v1/routes/LinkRoutes");

const mongoose = require("mongoose");
const cors = require("cors");
// const axios = require("axios");

app.use(cors());
app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(
    "mongodb://localhost:27017"
    // process.env.MONGO_URL ||
    // "mongodb+srv://lalapoh:jT3XP4e0Tw2lUGd8@cluster0.ftpol.mongodb.net/sementara?retryWrites=true&w=majority"
  )
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
// app.use(express.static("public"));
// mongoose
//   .connect(
//     "mongodb+srv://lalapoh:jT3XP4e0Tw2lUGd8@cluster0.ftpol.mongodb.net/mongoose?retryWrites=true&w=majority"
//   )
//   .then(console.log("Connected to MongoDB"))
//   .catch((err) => console.log("error connect : ", err));

app.use("/ping", pingRoutes);
app.use("/links", linkRoutes);
app.use("/accounts", accountRoutes);

// setInterval(function () {
//   console.log("---Wake Up every 30 Minutes---");
//   axios.get("https://outfit-media.herokuapp.com/feeds?status=inProgres");
// }, 1800000);

// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build", "index.html"));
// });

app.listen(process.env.PORT || "5000", () => {
  console.log("Backend is running.");
});
