const StudentsData = require("../model/studentsModel");
const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  addStudent,
  getStudent,
  displayUser,
  updateOneStudent,
} = require("../controllers/studentsControllers");

router.route("/").get(getAllStudents).post(addStudent);
router.route("/:name").put(getStudent).patch(getStudent, updateOneStudent);
router.route("/display/:name").get(getStudent, displayUser);

module.exports = router;
