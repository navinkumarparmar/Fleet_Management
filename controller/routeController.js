const Route = require("../models/routeModel");


module.exports.createRoute = async function (req, res) {
  try {
    const { origin, destination, distance, estimatedTime } = req.body;


    const existingRoute = await Route.findOne({ origin, destination });
    if (existingRoute) {
      return res.status(400).json({ message: "Route already exists" });
    }

 
    const newRoute = new Route({ origin, destination, distance, estimatedTime });
    await newRoute.save();

    res.status(201).json({ message: "Route created successfully", newRoute });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports.getAllRoutes = async function (req, res) {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports.getRouteById = async function (req, res) {
  try {
    const { routeId } = req.params;
    const route = await Route.findById(routeId);

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports.deleteRoute = async function (req, res) {
  try {
    const { routeId } = req.params;
    const route = await Route.findByIdAndDelete(routeId);

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.status(200).json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
