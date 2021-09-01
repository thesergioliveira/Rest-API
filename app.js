const express = require("express");
const { readFile } = require("fs");
const morgan = require("morgan");
const path = require("path");
const faker = require("faker");
const StudentData = require("./model/studentsModel");

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

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views/pages"));
app.set("views", path.resolve(__dirname, "views/pages/"));

const userRouter = require("./router/user");
// console.log(userRouters);
app.use("/user", userRouter);
const displayRouter = require("./router/display");
app.use("/display", displayRouter);

app.get("/", async (req, res) => {
  StudentData.find((err, data) => {
    console.log(data.username);
    if (err) {
      console.log(err);
      res.status(err.status).send("Ooops, there was a problem");
    } else if (data.length) {
      res.render("index.ejs", { data });
    } else {
      res.render("index.ejs", { data: {} });
    }
  });

  // res.render("index.ejs", { message: "Test" });
  // readFile("./public/index.html", "utf8", (err, html) => {
  //   if (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  //   res.send(html);
  // });
});

app.get("/about", async (req, res) => {
  res.render("about.ejs", { message: "Test" });
});
module.exports = app;
