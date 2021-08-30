const mongoose = require("mongoose");
// SchemaType is a configuration object for an individual property in mongooseSchema: https://mongoosejs.com/docs/schematypes.html
const studentsDataSchema = new mongoose.Schema({
  username: {
    type: String,
    // lowercase: true,
    trim: true,
    required: [true, "It is required to give a name "],
  },
  userPass: {
    type: String,
    required: [
      true,
      "For security reasons it is necessary to have a UserPass!",
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
  fbw: {
    type: {},
  },
  toolStack: Array,
  email: {
    type: String,
  },
});
module.exports = mongoose.model("StudentsData", studentsDataSchema, "students");
