const Vehicle = require("../models/vehicleModel");


module.exports.addVehicle = async function (req, res,next){
  try {
    const { registrationNumber, model, type, capacity, status, documents } =
      req.body;

    const existingVehicle = await Vehicle.findOne({ registrationNumber });
    if (existingVehicle) {
      return res.status(400).json({ message: "Vehicle already exists" });
    }

   

    const newVehicle = new Vehicle({
      registrationNumber,
      model,
      type,
      capacity,
      status,
      documents,
    });

    await newVehicle.save();
    res.status(201).json({ message: "Vehicle added successfully", newVehicle });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports.getAllVehicles = async function(req, res,next){
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports.getVehicleById = async function(req, res,next){
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};




module.exports.deleteVehicle = async function (req, res,next){
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.updateVehicle = async function (req, res,next){
  try {
    const updateBody = req.body;
    const deletedVehicle = await Vehicle.findByIdAndUpdate(req.params.id,updateBody);
    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle update successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

