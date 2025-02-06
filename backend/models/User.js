const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // name: {
  //   firstName: {
  //     type: String,
  //     required: true,
  //   },
  //   lastName: {
  //     type: String,
  //   },
  // },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  profilePicture: {
    type: String,
    default: ""
  },
  about: {
    type: String,
    default: ""
  },
});

module.exports = mongoose.model("User", userSchema);
