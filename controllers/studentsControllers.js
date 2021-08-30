const { send } = require("process");
const StudentsData = require("../model/studentsModel");

// Middlewares
// find one student upon name search
const getStudent = async (req, res, next) => {
  let user;
  // console.log(req.params.name);
  try {
    // localhost:5000/user/display/Sergio
    user = await StudentsData.findOne({ username: req.params.name });

    // console.log(user);
    if (user == null)
      return res
        .status(404)
        .json({ message: `This user is not registered in our archives!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.student = user;
  console.log(res.student);
  next();
};

// capitalizing first letter
const capitalizeUsername = async (req, res, next) => {
  const name = res.student.username;
  console.log(name);
};

// checking out if required DB Schema was met
const mustContain = (req, res, next) => {
  const { username, userPass, age, fbw, toolStack, email } = req.body;
  if (!username || !userPass || !age || !fbw || !email) {
    return res.status(400).json({
      message:
        "We cannot validate your user. The keys username, userPass, age, fbw and email are required make sure to add them :) ",
    });
  } else if (age <= "18") {
    return res.status(400).json({
      message:
        "We can not validate your user. We don't accept pp that are below 18 years of age",
    });
  } else if (fbw != "48") {
    return res
      .status(400)
      .json({
        message:
          "we can not validate your user. They are not a member of FBW48",
      });
  }
  res.student = req.body;
  next();
};

// filtering the
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
    username: res.student.username,
    userPass: res.student.userPass,
    age: res.student.age,
    fbw: res.student.fbw,
    toolStack: res.student.toolStack,
    email: res.student.email,
  });
  try {
    const newStudent = await student.save();
    res.status(201).json({ message: `this user is valid!` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Display user - http://localhost:5000/user/display/:name
const displayUser = async (req, res) => {
  console.log(res.student);
  res.status(200).json(res.student);
};
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
  capitalizeUsername,
  mustContain,
};
