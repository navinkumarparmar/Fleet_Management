const Driver = require("../models/driversModel");

module.exports.addDriver = async function (req, res, next) {
  try {
    const { name, licenseNumber, contactInfo, assignedVehicle, status } =
      req.body;

      const existingDriver = await Driver.findOne({ licenseNumber });
      if (existingDriver) {
        return res.status(400).json({ message: "Driver already exists" });
      }
  
     
      if (assignedVehicle) {
        const existingVehicleAssignment = await Driver.findOne({ assignedVehicle });
  
        if (existingVehicleAssignment) {
          return res.status(400).json({
            message: "This vehicle is already assigned to another driver.",
          });
        }
      }

    const newDriver = new Driver({
      name,
      licenseNumber,
      contactInfo,
      assignedVehicle,
      status,
    });

    await newDriver.save();
    res.status(201).json({ message: "Driver added successfully", newDriver });
  } catch (error) {
    res.status(500).json({
       message: "Server error",
       error:error.message });
  }
};


module.exports.getAllDrivers = async function (req, res, next) {
    try {
      const drivers = await Driver.find().populate("assignedVehicle");
      res.status(200).json(drivers);
    } catch (error) {
      res.status(500).json({ message: "Server error",error:error.message });
    }
  };

  
  module.exports.getDriverById = async function (req, res, next) {
    try {
      const driver = await Driver.findById(req.params.id).populate("assignedVehicle");
      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }
      res.status(200).json(driver);
    } catch (error) {
      res.status(500).json({ message: "Server error",error:error.message });
    }
  };

  
  module.exports.updateDriver = async function (req, res, next) {
    try {
      const updateBody=  req.body;
  
      const updatedDriver = await Driver.findByIdAndUpdate(
        req.params.id,
        updateBody,
        { new: true, runValidators: true }
      );
  
      if (!updatedDriver) {
        return res.status(404).json({ message: "Driver not found" });
      }
  
      res
        .status(200)
        .json({ message: "Driver updated successfully", updatedDriver });
    } catch (error) {
      res.status(500).json({ message: "Server error", error:error.message });
    }
  };

  
  module.exports.deleteDriver = async function (req, res, next) {
    try {
      const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
      if (!deletedDriver) {
        return res.status(404).json({ message: "Driver not found" });
      }
      res.status(200).json({ message: "Driver deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error:error.message});
    }
  };
  