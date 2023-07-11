const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
const Jobs = require("../models/jobModel");

const DB = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

// READ JSON FILE
const jobs = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "utf-8"));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Jobs.create(jobs);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Jobs.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
