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
  processingStudent,
  mustContain,
} = require("../controllers/studentsControllers");

router.route("/").get(getAllStudents).post(mustContain, addStudent);
router
  .route("/:name")
  .put(updateAllStudentData)
  .patch(getStudent, updateOneStudent);
router.route("/display/:name").get(getStudent, processingStudent, displayUser);

module.exports = router;
