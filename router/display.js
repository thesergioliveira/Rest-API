const StudentData = require("../model/studentsModel");
const express = require("express");
const router = express.Router();

// Importing middleware and controllers
const middleware = require("../middlewares/middleware");
const controller = require("../controllers/studentsControllers");

router
  .route("/postman/:name")
  .get(
    middleware.getStudent,
    middleware.toUpperCase,
    middleware.intoNumber,
    middleware.sortAlpha,
    controller.displayUser
  );
router.route("/allUsers", controller.displayAll);

module.exports = router;
