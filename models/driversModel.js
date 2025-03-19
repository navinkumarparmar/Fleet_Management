const mongoose = require("mongoose");

const DriverModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },

    contactInfo: {
      type: String,
      required: true,
    },
    assignedVehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    status: {
      type: String,
      enum: ["available", "on-trip"],
      default: "available",
    },
  },
  { timestamps: true }
);

const driverModel = new mongoose.model('Driver',DriverModel)
module.exports = driverModel