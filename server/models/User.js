let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let mongoose = require("mongoose");

let schema = new mongoose.Schema({
  firebaseuid: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


schema.methods.generateAuthToken =  ()=> {
  let token = jwt.sign({ id: this.id }, process.env.SECRET);
  return token;
};

let User = mongoose.model("User", schema);

module.exports = User;
