const express = require("express");
const apiroutes = express.Router();
const vehicleController = require("../controller/vehicleController");
const {verifyToken} = require('../middlwere/verifyToken')
const checkpermission = require('../middlwere/checkPermission')

apiroutes.post("/register",verifyToken,checkpermission(['admin']), vehicleController.addVehicle);
apiroutes.delete("/delete/:id",verifyToken,checkpermission(['admin']), vehicleController.deleteVehicle);
apiroutes.put("/update/:id",verifyToken,checkpermission(['admin']), vehicleController.updateVehicle);
apiroutes.get("/listByid/:id",verifyToken,checkpermission(['admin']), vehicleController.getVehicleById);

module.exports = apiroutes;
