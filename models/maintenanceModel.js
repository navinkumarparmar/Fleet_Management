const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    maintenanceDate: {
      type: Date,
      required: true,
    },
    nextDueDate:{
      type: Date,
      
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const maintenanceModel = mongoose.model("Maintenance", MaintenanceSchema);
module.exports = maintenanceModel;
