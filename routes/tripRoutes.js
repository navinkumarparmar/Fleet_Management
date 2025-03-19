const express = require("express");
const apiroutes = express.Router();
const tripController = require("../controller/tripController");
const {verifyToken} = require('../middlwere/verifyToken')
const checkpermission = require('../middlwere/checkPermission')

apiroutes.post("/create", verifyToken,checkpermission(['admin']),tripController.createTrip);
apiroutes.get("/all", verifyToken,checkpermission(['admin']),tripController.getAllTrips);
apiroutes.put("/start/:tripId",verifyToken,checkpermission(['admin']), tripController.startTrip);
apiroutes.put("/end/:tripId", verifyToken,checkpermission(['admin']),tripController.endTrip);
apiroutes.get('/tripbyid/:id',verifyToken,checkpermission(['admin']),tripController.getTripById)

module.exports = apiroutes;
