let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let mongoose = require("mongoose");

let schema = new mongoose.Schema({
  firebaseUid: {
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
schema.pre("save", async  ()=> {
  // FIXED: "password" must be passed as a string literal
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});


schema.methods.generateAuthToken =  ()=> {
  let token = jwt.sign({ id: this.id }, process.env.SECRET);
  return token;
};

let User = mongoose.model("User", schema);

// FIXED: Corrected export syntax
module.exports = User;
