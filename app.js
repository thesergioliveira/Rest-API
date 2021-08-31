const express = require("express");
const { readFile } = require("fs");
const morgan = require("morgan");
const path = require("path");
const faker = require("faker");

const app = express();
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

const students = require("./router/students");
app.use("/user", students);

app.get("/", async (req, res) => {
  res.status(200);

  readFile("./public/index.html", "utf8", (err, html) => {
    if (err) {
      res.status(500).json({ message: err.message });
    }
    res.send(html);
  });
});

module.exports = app;
