// Create express router

const express = require("express");
const {
  findAll,
  createTrip,
  deleteTrip,
  findById,
  editTrip
} = require("./controllers/trip.controller.js");
const router = express.Router();

// Create a new trip
router.post("/Create", (req, res) => {
  createTrip(req, res);
});

router.get("/getTripById", (req, res) => {
  findById(req, res);
});

// find all trips with username
router.get("/getAllTrips", (req, res) => {
  findAll(req, res);
});

// Update a trip with id
router.put("/editTrip", (req, res) => {
  editTrip(req, res);
});

// Delete a trip with id
router.delete("/deleteTrip", (req, res) => {
  deleteTrip(req, res);
});

// Expores the router
module.exports = router;
