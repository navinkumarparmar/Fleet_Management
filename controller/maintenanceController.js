const Maintenance = require("../models/maintenanceModel");
const Vehicle = require("../models/vehicleModel");

module.exports.addMaintenance = async function (req, res) {
  try {
    let { vehicle, maintenanceType, description, maintenanceDate, nextDueDate } = req.body;
    maintenanceDate = new Date(maintenanceDate);
    nextDueDate = new Date(nextDueDate);

    const existingVehicle = await Vehicle.findById(vehicle);
    if (!existingVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const newMaintenance = new Maintenance({
      vehicle,
      maintenanceType,
      description,
      maintenanceDate,
      nextDueDate,
    });

    await newMaintenance.save();
    res.status(201).json({ message: "Maintenance log added", newMaintenance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports.getMaintenanceByVehicle = async function (req, res) {
    try {
      const { vehicleId } = req.params;
  
      const maintenanceLogs = await Maintenance.find({ vehicle: vehicleId });
  
      if (maintenanceLogs.length === 0) {
        return res.status(404).json({ message: "No maintenance records found for this vehicle" });
      }
  
      res.status(200).json({ message: "Maintenance records fetched", maintenanceLogs });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  
  module.exports.updateMaintenanceStatus = async function (req, res) {
    try {
      const { maintenanceId } = req.params;
      const { status } = req.body;
  
      const maintenance = await Maintenance.findById(maintenanceId);
      if (!maintenance) {
        return res.status(404).json({ message: "Maintenance record not found" });
      }
  
      maintenance.status = status;
      await maintenance.save();
  
      res.status(200).json({ message: "Maintenance status updated", maintenance });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  
  module.exports.getUpcomingMaintenance = async function (req, res) {
    try {
      const today = new Date();
  
      const upcomingMaintenance = await Maintenance.find({
        nextDueDate: { $gte: today }, 
        status: "pending"
      }).populate("vehicle");
  
      res.status(200).json({ message: "Upcoming maintenance records fetched", upcomingMaintenance });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  