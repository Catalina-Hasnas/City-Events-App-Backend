const express = require("express");
const bodyParser = require("body-parser");
const eventsRoutes = require("./routes/events-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/events", eventsRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unkown error occured" });
});

app.listen("5000");
