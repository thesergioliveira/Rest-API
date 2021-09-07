const StudentsData = require("../model/studentsModel");
const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  addStudent,
  getStudent,
  displayUser,
  updateOneStudent,
  updateAllStudentData,
  toUpperCase,
  intoNumber,
  sortAlpha,
  mustContain,
} = require("../controllers/studentsControllers");

router.route("/").get(getAllStudents).post(mustContain, addStudent);
router
  .route("/:name")
  .put(getStudent, updateAllStudentData)
  .patch(getStudent, updateOneStudent);

module.exports = router;
