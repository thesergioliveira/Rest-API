const express = require("express");
const { readFile } = require("fs");
const morgan = require("morgan");
const path = require("path");
const faker = require("faker");
const StudentData = require("./model/studentsModel");
const {
  mustContain,
  addStudent,
} = require("./controllers/studentsControllers");

const app = express();

// Print verbose in the terminal
app.use(morgan("dev"));

// To be able to process all the json files
app.use(express.json());

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

// Setting the templating engine and the path to the files to be rendered
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views/pages"));

// Importing user route
const userRouter = require("./router/user");
app.use("/user", userRouter);

// Importing the display router
const displayRouter = require("./router/display");
app.use("/display", displayRouter);

// Setting the root route
app.get("/", async (req, res) => {
  res.render("home.ejs");
});

// Setting the display route
app.get("/display", async (req, res) => {
  StudentData.find((err, data) => {
    // console.log(data[0].toolStack);
    if (err) {
      console.log(err);
      res.status(err.status).send("Ooops, there was a problem");
    } else if (data.length) {
      res.render("display.ejs", { data });
    } else {
      res.render("display.ejs", { data: {} });
    }
  });

  // Rendering files without a templating engine
  // res.render("index.ejs", { message: "Test" });
  // readFile("./public/index.html", "utf8", (err, html) => {
  //   if (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  //   res.send(html);
  // });
});

// Setting the register route with get and post method
app
  .get("/register", async (req, res) => {
    res.render("registration.ejs");
  })
  .post("/register", mustContain, addStudent);
module.exports = app;
