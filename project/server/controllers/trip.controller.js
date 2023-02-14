const db = require("../models");
// models path depends on your structure
const Trips = db.Trips;

const createTrip = (req, res) => {
  // Validate request
  if (!req.body.destination) {
    res.status(400).send({
      Message: "Content cannot be empty",
    });
    return;
  }

  // Create a trip
  const trip = {
    destination: req.body.destination,
    hotel: req.body.hotel,
    username: req.body.username,
    phoneNumber: req.body.phoneNumber,
    nightLife: req.body.nightLife,
    landscape: req.body.landscape,
    shopping: req.body.shopping,
    finalGrade: req.body.finalGrade,
    english: req.body.english,
    hebrew: req.body.hebrew,
    else: req.body.else,
    dates: req.body.dates,
    recommendations: req.body.recommendations,
    description: req.body.description,
    top3: req.body.top3,
    lat: req.body.lat,
    lng: req.body.lng,
  };

  // Save trip in the database
  Trips.create(trip)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        Message:
          err.message || "Some errors will occur when creating a new trip",
      });
    });
};

const findAll = (req, res) => {
  // find all trips by username
  Trips.findAll({ where: { username: req.query.username } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving trips.",
      });
    });
};

const deleteTrip = (req, res) => {
  const id = req.body.id;

  Trips.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Trip was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Trip with id=${id}. Maybe Trip was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Trip with id=" + id,
      });
    });
};

const findById = (req, res) => {
  const id = req.query.id;

  Trips.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Trip with id=" + id,
      });
    });
};

const editTrip = (req, res) => {
  const id = req.body.id;

  Trips.update(req.body.trip, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Trip was updated successfully.",
          username: req.body.trip.username,
        });
      } else {
        res.send({
          message: `Cannot update Trip with id=${id}. Maybe Trip was not found or req.body is empty!`,
          username: req.body.trip.username,
        });
      }
    })
    .catch((err) => {});
};

module.exports = {
  createTrip,
  findAll,
  deleteTrip,
  findById,
  editTrip,
};
