const StudentsData = require("../model/studentsModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const dataBase = await StudentsData.find();
    res.status(200).json(dataBase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.export = router;
