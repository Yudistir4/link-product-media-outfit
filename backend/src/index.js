/* eslint-disable no-undef */
const express = require('express');
require('dotenv').config();

const app = express();
const pingRoutes = require('./api/v1/routes/PingRoutes');
const accountRoutes = require('./api/v1/routes/AccountRoutes');
const userRoutes = require('./api/v1/routes/UserRoutes');
const linkRoutes = require('./api/v1/routes/LinkRoutes');

const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./api/v1/middlewares/errorHandler');
// const axios = require("axios");

app.use(cors());
app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));
// app.use(express.static("public"));

app.use('/ping', pingRoutes);
app.use('/links', linkRoutes);
app.use('/accounts', accountRoutes);
app.use('/users', userRoutes);
app.use(errorHandler);
// setInterval(function () {
//   console.log("---Wake Up every 30 Minutes---");
//   axios.get("https://outfit-media.herokuapp.com/feeds?status=inProgres");
// }, 1800000);

// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build", "index.html"));
// });

app.listen(process.env.PORT || '5000', () => {
  console.log('Backend is running.');
});
