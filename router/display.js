const StudentData = require("../model/studentsModel");
const express = require("express");
const router = express.Router();

// Importing middleware and controllers
const {
  getStudent,
  toUpperCase,
  intoNumber,
  sortAlpha,
  displayUser,
} = require("../controllers/studentsControllers");
router
  .route("/:name")
  .get(getStudent, toUpperCase, intoNumber, sortAlpha, displayUser);

module.exports = router;
