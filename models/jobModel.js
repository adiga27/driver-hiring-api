const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The driver must have a name"],
    trim: true,
    maxlength: [40, "A tour name must have less or equal then 40 characters"],
    minlength: [1, "A tour name must have more or equal then 1 characters"],
  },
  image: {
    type: String,
    default: "No Image",
  },
  drive: {
    type: String,
    required: [true, "Vehicle should be mentioned"],
  },
  price: {
    type: Number,
    required: [true, "Driver must have a price for a day"],
  },
  place: {
    type: String,
    required: [true, "Driver should tell the place"],
  },
  rating: {
    type: Number,
    default: 4,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
  },
  contact: {
    type: Number,
    required: true,
    unique: [true, "Driver should have unique number"],
  },
  pricePerKm: {
    type: Number,
    default: 6,
  },
});

module.exports = mongoose.model("Jobs", jobsSchema);
