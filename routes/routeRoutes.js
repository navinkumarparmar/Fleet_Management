const express = require("express");
const router = express.Router();
const routeController = require("../controller/routeController");
const {verifyToken} = require('../middlwere/verifyToken')
const checkpermission = require('../middlwere/checkPermission')

router.post("/create", verifyToken,checkpermission(['admin']),routeController.createRoute);
router.get("/all",verifyToken,checkpermission(['admin']), routeController.getAllRoutes);
router.get("/:routeId", verifyToken,checkpermission(['admin']),routeController.getRouteById);
router.delete("/:routeId",verifyToken,checkpermission(['admin']), routeController.deleteRoute);

module.exports = router;
