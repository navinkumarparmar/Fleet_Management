const express = require("express");
const apiroutes = express.Router();
const maintenanceController = require("../controller/maintenanceController");
const {verifyToken} = require('../middlwere/verifyToken')
const checkpermission = require('../middlwere/checkPermission')

apiroutes.post("/create", verifyToken, checkpermission(['admin']), maintenanceController.addMaintenance);
apiroutes.get("/list/:vehicleId", verifyToken, maintenanceController.getMaintenanceByVehicle);
apiroutes.put("/updateStatus/:maintenanceId", verifyToken, checkpermission(['admin']), maintenanceController.updateMaintenanceStatus);
apiroutes.get("/upcoming", verifyToken, maintenanceController.getUpcomingMaintenance);

module.exports = apiroutes;
