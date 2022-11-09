const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_EVENTS = [
  {
    id: "1",
    title: "First Event",
    description: "Home",
    date: {
      year: 2022,
      month: 10,
      day: 30,
    },
    location: {
      lat: 45.7295036,
      long: 21.2331496,
    },
    adress: "Azuga nr.6",
    creator: "Catalina",
  },
  {
    id: "2",
    title: "Second Event",
    description: "Brother's",
    date: {
      year: 2022,
      month: 10,
      day: 31,
    },
    location: {
      lat: 45.7355357,
      long: 21.2475823,
    },
    adress: "Bulevardul Sudului nr. 13",
    creator: "Catalina",
  },
  {
    id: "3",
    title: "Third Event",
    description: "Amdaris",
    date: {
      year: 2023,
      month: 10,
      day: 31,
    },
    location: {
      lat: 45.7651184,
      long: 21.2257515,
    },
    adress: "Piata Consiliului Europei nr.2",
    creator: "Catalina",
  },
];

const getEvents = (req, res, next) => {
  let returnEvents = DUMMY_EVENTS;
  const params = req.query;
  const filterBy = ({ name, value }, arr) => {
    return arr.filter((event) => event.date[name] === parseInt(value));
  };
  const getEvents = ({ year, month, day }) => {
    let events = DUMMY_EVENTS;
    if (year) {
      events = filterBy({ name: "year", value: year }, events);
    }
    if (month) {
      events = filterBy(
        {
          name: "month",
          value: month,
        },
        events
      );
    }
    if (day) {
      events = filterBy({ name: "day", value: day }, events);
    }
    return events;
  };
  if (Object.keys(params).length > 0) {
    returnEvents = getEvents(params);
  }
  res.status(200).json(returnEvents);
};

const getEventById = (req, res, next) => {
  const eventId = req.params.id;
  const event = DUMMY_EVENTS.find(({ id }) => {
    return id === eventId;
  });

  if (!event) {
    const error = new HttpError("Couln't find an event with this id.", 404);
    return next(error);
  }

  res.status(200).json({ event });
};

const createEvent = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input", 422);
  }
  console.log(errors);
  const newEvent = {
    ...req.body,
    id: uuidv4(),
  };
  DUMMY_EVENTS.push(newEvent);
  res.status(201).json({ event: newEvent });
};

const editEventById = (req, res, next) => {
  const eventId = req.params.id;
  const eventToBeEdited = DUMMY_EVENTS.findIndex(
    (event) => event.id === eventId
  );
  const editedEvent = { ...DUMMY_EVENTS[eventToBeEdited], ...req.body };
  DUMMY_EVENTS[eventToBeEdited] = editedEvent;
  res.status(200).json({ editedEvent: DUMMY_EVENTS[eventToBeEdited] });
};

const deleteEventById = (req, res, next) => {
  const eventId = req.params.id;
  DUMMY_EVENTS = DUMMY_EVENTS.filter((event) => event.id !== eventId);
  console.log(DUMMY_EVENTS.filter((event) => event.id !== eventId));
  // res.status(200).json(`event with the id ${eventId} was deleted`);
  res.status(200).json({ arr: DUMMY_EVENTS });
};

exports.getEvents = getEvents;
exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.editEventById = editEventById;
exports.deleteEventById = deleteEventById;
