const StudentsData = require("../model/studentsModel");
const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/middleware");
const controller = require("../controllers/studentsControllers");

router
  .route("/")
  .get(controller.getAllStudents)
  .post(middleware.mustContain, controller.addStudent);
router
  .route("/:name")
  .put(middleware.getStudent, controller.updateAllStudentData)
  .patch(middleware.getStudent, controller.updateOneStudent);

module.exports = router;
