const express = require("express");
const router = express.Router();
const controller = require("../controllers/studentsControllers");
const middleware = require("../middlewares/middleware");

router
  .route("/register")
  .get(controller.rendering)
  .post(middleware.mustContain, controller.addStudent);

module.exports = router;
