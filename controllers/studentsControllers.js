const { send } = require("process");
const StudentsData = require("../model/studentsModel");

// Middlewares
const getStudent = async (req, res, next) => {
  let user;
  console.log(req.params.name);
  try {
    user = await StudentsData.findOne({ username: req.params.name });
    console.log(user);
    if (user == null)
      return res
        .status(404)
        .json({ message: `This user is not registered in our archives!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.student = user;
  next();
};

// Controllers
// Fetch all the data in the DB
//http://localhost:5000/user
const getAllStudents = async (req, res) => {
  try {
    const allStudents = await StudentsData.find();
    // console.log(allStudents);
    res.status(200).json(allStudents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Adding a student in the DB
//http://localhost:5000/user
const addStudent = async (req, res) => {
  const student = new StudentsData({
    username: req.body.username,
    userPass: req.body.userPass,
    age: req.body.age,
    fbw: req.body.fbw,
    toolStack: req.body.toolStack,
    email: req.body.email,
  });
  try {
    const newStudent = await student.save();
    res
      .status(201)
      .json({ message: `${newStudent.username} was added to the DB!` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Display user - http://localhost:5000/user/display/:name
const displayUser = async (req, res) => res.status(200).json(res.student);

// Updating one student partial or full information
const updateOneStudent = async (req, res) => {
  const { username, userPass, age, fbw, toolStack, email } = req.body;
  if (username) {
    res.student.username = username;
  } else if (userPass) {
    res.student.userPass = userPass;
  } else if (age) {
    res.student.age = age;
  } else if (fbw) {
    res.student.fbw = fbw;
  } else if (toolStack) {
    res.student.toolStack = toolStack;
  } else if (email) {
    res.student.email = email;
  }
  try {
    const updatedUser = await res.student.save();
    res.status(200).json({ message: "The user was updated", updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllStudents,
  addStudent,
  getStudent,
  displayUser,
  updateOneStudent,
};
