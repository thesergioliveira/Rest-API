const middleware = {};

// Middlewares_____________________________________
// find one student upon name search
middleware.getStudent = async (req, res, next) => {
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
  // console.log(res.student);
  next();
};

// capitalizing first letter
middleware.toUpperCase = async (req, res, next) => {
  // importing
  console.log("name from DB:", res.student.username);
  const { username } = res.student;
  let newUsername;
  // console.log("straight from DB:", res.student.username);
  // processing and exporting
  newUsername = username.charAt(0).toUpperCase() + username.slice(1);
  res.student.username = newUsername;
  console.log("edited username:", newUsername);
  next();
};

// sorting toolStack alphabetically
middleware.sortAlpha = (req, res, next) => {
  const { toolStack } = res.student;
  // exporting
  res.student.toolStack = toolStack.sort();
  next();
};
// changing age and fbw into Number
middleware.intoNumber = (req, res, next) => {
  const { age, fbw } = res.student;
  let newAge;
  let newFbw;

  if (typeof age == "string") newAge = Number(age); //could also work as parseInt(age, 10);

  if (typeof fbw == "string") newFbw = Number(fbw);

  // exporting
  res.student.age = newAge;
  res.student.fbw = newFbw;
  // console.log(res.student);
  next();
};
// checking out if required DB Schema was met
middleware.mustContain = (req, res, next) => {
  console.log(req.body);
  const { username, userPass, age, fbw, toolStack, email } = req.body;
  if (!username || !userPass || !age || !fbw || !email) {
    return res.status(400).json({
      message:
        "We cannot validate your user. The keys username, userPass, age, fbw and email are required make sure to add them :) ",
    });
  } else if (parseInt(age, 10) <= 18) {
    return res.status(400).json({
      message:
        "We can not validate your user. We don't accept pp that are below 18 years of age",
    });
  } else if (fbw != 48) {
    return res.status(400).json({
      message: "we can not validate your user. They are not a member of FBW48",
    });
  }
  res.student = req.body;
  next();
};

module.exports = middleware;
