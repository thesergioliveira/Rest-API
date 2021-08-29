const mongoose = require("mongoose");
// SchemaType is a configuration object for an individual property in mongooseSchema: https://mongoosejs.com/docs/schematypes.html
const studentsDataSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "It is required to give a name "],
  },
  userPass: {
    type: String,
    required: [
      true,
      "You will be given a default password of 123456, for security reasons.please change as soon as possible!",
    ],
  },
  age: {
    type: {},
    min: 18,
    required: [
      true,
      "Please provide your age. Also note, that you must be above 18 in order to use the Application!",
    ],
  },
  fbw: { type: Number },
  toolStack: Array,
  email: {
    type: String,
    required: [true, "It is required to register an email!"],
  },
});
module.exports = mongoose.model("StudentsData", studentsDataSchema, "students");
