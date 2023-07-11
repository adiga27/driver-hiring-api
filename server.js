require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const dotenv = require("dotenv");

app.use(express.json());

// mongoose.connect(process.env.DATABASE_URL);

// dotenv.config({ path: "./.env" });

// const db = mongoose.connection;
// db.on("error", (error) => console.log(error));
// db.once("open", () => console.log("Database connected"));

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
