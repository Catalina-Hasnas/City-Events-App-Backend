const express = require("express");
const {
  getEvents,
  getEventById,
  createEvent,
} = require("../controllers/events-controller");

const router = express.Router();

router.get("/", getEvents);

router.get("/:id", getEventById);

router.post("/", createEvent);

module.exports = router;