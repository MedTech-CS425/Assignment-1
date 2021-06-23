const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const User = mongoose.model("User");
const { handleError, ErrorHandler } = require("../helpers/error");

module.exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if(user){
      throw new ErrorHandler(422, "duplicate e-mail adress")
  }
    res.status(201).json(await User.create(req.body))
  }
  catch (error) {
    if(error.status===500) error = new ErrorHandler(500,"Internal server error") 
    if(error.status===401) error = new ErrorHandler(401,"Unauthorized")
    next(error);
  }
}

module.exports.login = (req, res, next) => {
  try{
  // call for passport authentication
  passport.authenticate("local", (err, user, info) => {
    // error from passport middleware
    if (err) throw new ErrorHandler(400, "error from passport");
    // registered user
    else if (user) return res.status(200).json({ token: user.generateJwt() });
    // unknown user or wrong password
    else return res.status(422).json({status: false, info});
  })(req, res);
  }catch(error){
    if(error.status===500) error = new ErrorHandler(500,"Internal server error") 
    next(error)
  }
}

module.exports.getUser = (req, res, next) => {
  try{
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    else
      return res
        .status(200)
        .json({ status: true, user: _.pick(user, ["email"], ["username"]) });
  });
}catch(error){
  if(error.status===500) error = new ErrorHandler(500,"Internal server error") 
    next(error)
 }
}
