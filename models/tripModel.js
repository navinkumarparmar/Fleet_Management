const mongoose = require("mongoose");

const TripModel = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    startTime: {
      type: Date,
   
    },
    endTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);


const tripModel  = new mongoose.model("Trip", TripModel);
module.exports = tripModel
