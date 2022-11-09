const express = require("express");
const { check } = require("express-validator");
const {
  getEvents,
  getEventById,
  createEvent,
  editEventById,
  deleteEventById,
} = require("../controllers/events-controller");

const router = express.Router();

router.get("/", getEvents);

router.get("/:id", getEventById);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createEvent
);

router.patch("/:id", editEventById);

router.delete("/:id", deleteEventById);

module.exports = router;
