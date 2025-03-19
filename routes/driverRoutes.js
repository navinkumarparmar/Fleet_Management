const express = require("express");
const apiroutes = express.Router();
const driverController = require("../controller/driverController");
const {verifyToken} = require('../middlwere/verifyToken')
const checkpermission = require('../middlwere/checkPermission')

apiroutes.post("/add", verifyToken,checkpermission(['admin']),driverController.addDriver);
apiroutes.get("/all", verifyToken,checkpermission(['admin']),driverController.getAllDrivers);
apiroutes.get("/:id",verifyToken,checkpermission(['admin']), driverController.getDriverById);
apiroutes.put("/update/:id", verifyToken,checkpermission(['admin']),driverController.updateDriver);
apiroutes.delete("/delete/:id", verifyToken,checkpermission(['admin']),driverController.deleteDriver);

module.exports = apiroutes;
