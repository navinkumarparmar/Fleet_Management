const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema(
  {
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    estimatedTime: {
      type: Number, 
      required: true,
    },
  },
  { timestamps: true }
);

const routeModel = mongoose.model("Route", RouteSchema);
module.exports = routeModel;
