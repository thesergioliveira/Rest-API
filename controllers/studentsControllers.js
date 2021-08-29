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
  //   console.log(res.student);
  //   console.log(req.body);
  const { username, userPass, age, fbw, toolStack, email } = req.body;
  if (username) res.student.username = username;

  if (userPass) res.student.userPass = userPass;

  if (age) res.student.age = age;

  if (fbw) res.student.fbw = fbw;

  if (toolStack) res.student.toolStack = toolStack;

  if (email) res.student.email = email;

  try {
    await res.student.save();
    res.status(200).json({ message: "The user was updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Updating all information of a specific student - htpp://localhost:5000/user/:name
const updateAllStudentData = async (req, res) => {
  const { name, pass, newAge, newClass, tools, contact } = req.body;
  console.log(req.params.name);
  try {
    await StudentsData.updateOne(
      { username: req.params.name },
      {
        $set: {
          username: name,
          userPass: pass,
          age: newAge,
          //   fbw: newClass,
          //   toolStack: tools,
          //   email: contact,
        },
        $currentDate: {
          studentUpdateDate: Date.now,
        },
      }
    );
    res
      .status(200)
      .json({ message: `the student ${req.params.name}, got updated!` });
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
  updateAllStudentData,
};
