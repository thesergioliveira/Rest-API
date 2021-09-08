const StudentsData = require("../model/studentsModel");
const controller = {};
// Controllers_____________________________________
// Fetch all the data in the DB
//http://localhost:5000/user
controller.getAllStudents = async (req, res) => {
  try {
    const allStudents = await StudentsData.find();
    // console.log(allStudents);
    res.status(200).json({ allStudents });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Adding a student in the DB
//http://localhost:5000/user
controller.addStudent = async (req, res) => {
  // console.log(req.body);
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
  // res.redirect("/");
};

//Display user - http://localhost:5000/user/display/:name
controller.displayUser = async (req, res) => {
  console.log(res.student);
  res.status(200).json(res.student);
};
// Updating one student partial or full information
controller.updateOneStudent = async (req, res) => {
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
controller.updateAllStudentData = async (req, res) => {
  const { username, userPass, age, fbw, toolStack, email } = req.body;
  console.log(req.params.name);
  try {
    await StudentsData.updateOne(
      { username: req.params.name },
      {
        $set: {
          username: username, // req.body.username,
          userPass: userPass, //req.body.userPass,
          // age: age, //req.body.age,
          // fbw: fbw, //req.body.fbw,
          toolStack: toolStack, //req.body.toolStack,
          // email: email, //req.body.email,
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

// Rendering registration page
controller.rendering = async (req, res) => {
  res.render("registration.ejs");
};

// Rendering all users to frontend
controller.displayAll = async (req, res) => {
  StudentsData.find((err, data) => {
    if (err) {
      res.status(err.status).send("Ooops, there was a problem");
    } else if (data.length) {
      res.render("display", { data });
    } else {
      res.render("display", { data: {} });
    }

    // Rendering files without a templating engine
    // res.render("index.ejs", { message: "Test" });
    // readFile("./public/index.html", "utf8", (err, html) => {
    //   if (err) {
    //     res.status(500).json({ message: err.message });
    //   }
    //   res.send(html);
    // });
  });
};
module.exports = controller;
