require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

///////////////
const DB = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));
//////////////

const jobsRouter = require("./routes/jobs.js");
app.use("/jobs", jobsRouter);

app.listen(3000, () => console.log("Connected"));
