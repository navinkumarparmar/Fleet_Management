const express = require('express');
const apiroutes = express.Router();

const auth = require('./authRoutes');
const vehicle = require('./vehicleRoutes');
const driver = require('./driverRoutes')
const route = require('./routeRoutes');
const trip = require('./tripRoutes')
const maintenance = require('./maintenanceRoutes');


apiroutes.use('/auth',auth);
apiroutes.use('/vehicle',vehicle);
apiroutes.use('/driver',driver);
apiroutes.use('/route',route);
apiroutes.use('/trip',trip);
apiroutes.use('/maintenance',maintenance)

module.exports = apiroutes