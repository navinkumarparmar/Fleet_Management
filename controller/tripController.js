const Trip = require("../models/tripModel");
const Driver = require("../models/driversModel");
const Vehicle = require("../models/vehicleModel");
const Route = require('../models/routeModel')


module.exports.createTrip = async function (req, res) {
  try {
    const { vehicle, driver, route } = req.body;

   
    const existingDriver = await Driver.findById(driver);
    if (!existingDriver || existingDriver.assignedVehicle.toString() !== vehicle) {
      return res.status(400).json({ message: "This driver is not assigned to the given vehicle." });
    }


    const routeDetails = await Route.findById(route);
    if (!routeDetails) {
      return res.status(404).json({ message: "Route not found" });
    }

  
    const newTrip = new Trip({ 
      vehicle, 
      driver, 
      route,
      startTime: routeDetails.startTime,  
      endTime: routeDetails.endTime,      
      status: "scheduled"                 
    });

    await newTrip.save();
    res.status(201).json({ message: "Trip created successfully", newTrip });
  } catch (error) {
    res.status(500).json({ 
      message: "Server error", 
      error: error.message
     });
  }
};



module.exports.getAllTrips = async function (req, res) {
  try {
    const trips = await Trip.find().populate("vehicle driver route");
    res.status(200).json({ message: "All trips fetched successfully", trips });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports.startTrip = async function (req, res) {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.status !== "scheduled") {
      return res.status(400).json({ message: "Trip cannot be started, already in progress or completed." });
    }

    trip.status = "in-progress";
    trip.actualStartTime = new Date(); 
    await trip.save();

    res.status(200).json({ message: "Trip started successfully", trip });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports.endTrip = async function (req, res) {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findById(tripId);
    
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    if (trip.status !== "in-progress") return res.status(400).json({ message: "Trip cannot be completed" });

    trip.status = "completed";
    await trip.save();
    
    res.status(200).json({ message: "Trip completed", trip });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.getTripById = async function (req, res) {
  try {
    const tripId  = req.params.id

    const trip = await Trip.findById(tripId).populate("vehicle driver route");
    
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({ message: "Trip fetched successfully", trip });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};