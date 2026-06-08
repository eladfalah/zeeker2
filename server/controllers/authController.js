let User = require("../models/User");
let Joi = require("Joi");
let registerValidator = (user) => {
  let schema = Joi.object({
    name: Joi.string().trim().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  return schema.validate(user);
};

let loginValidator = (user) => {
  let schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  return schema.validate(user);
};

let register = async (req, res) => {
  // validation

  let { value } = registerValidator(req.body);
  let user = new User(value);
  let token = user.generateAuthToken();
  await user.save();
  res.json({ token });
};

let login = async (req, res) => {
   let { value } = loginValidator(req.body);
   let user = await User.findOne({ email: value.email });
   if (!user) return res.status(403).json("User not exist");
   let token = user.generateAuthToken();
   res.json({ token });
};

module.exports = { register, login };
