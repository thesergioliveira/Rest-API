const express = require("express");
const morgan = require("morgan");
const path = require("path");
const StudentData = require("./model/studentsModel");
const {
  mustContain,
  addStudent,
} = require("./controllers/studentsControllers");

// Initializing my application as an instance of express
const app = express();

// Print verbose in the terminal
app.use(morgan("dev"));

// To be able to process all the json files
app.use(express.json());

// To be able to process form data from the frontend
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Initializing an instance of mongoDB and connecting with local DB
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

// Connecting the DB
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Local mongoDB is connected 💪"))
  .catch((err) => {
    console.log(`There was a problem ${err.message}`);
  });

// Setting the ejs engine and the path to the files to be rendered
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views/pages"));

// Importing postman route
const hiddenRoute = require("./router/hidden");
app.use("/hidden", hiddenRoute);

// Importing the display router
const displayRoute = require("./router/display");
app.use("/display", displayRoute);

// Setting the root route
app.get("/", async (req, res) => {
  res.render("home.ejs");
});

// Importing the register route with get and post method
const registerRoute = require("./router/register");
app.use("/", registerRoute);
