const express = require("express");
const app = express();
const { readFile } = require("fs");
const morgan = require("morgan");

// Print verbose in the terminal
app.use(morgan("dev"));
// To be able to process all the json files
app.use(express.json());

// Initializing an instance of mongoDB and connecting with local DB
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Local mongoDB is connected 💪"))
  .catch((err) => {
    console.log(`There was a problem ${err.message}`);
  });

// importing and using a main route

// Creating and defining the response for the root route
app.get("/", async (req, res) => {
  res.status(200);

  readFile("./public/index.html", "utf8", (err, html) => {
    if (err) {
      res.status(500).json({ message: err.message });
    }
    res.send(html);
  });
});

const students = require("./router/students");
app.use("/students", students);

module.exports = app;
