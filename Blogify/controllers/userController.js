const User = require("../models/userModel");

const signupUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const user = await User.create({
      fullName,
      email,
      password,
    });
    res.redirect("/users/signin");
  } catch (error) {
    return res.status(400).json({ error });
  }
};

//@desc SIGN IN USER
//@route POST /users/signin

const signinUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields must be filled");
  }

  try {
    //static method call  -created in userModel
    const token = await User.signin(email, password);

    return res.cookie("token", token).redirect("/users");
  } catch (error) {
    return res.render("signin", {
      error: "Invalid email or password",
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");

  return res.redirect("/users/signin");
};

module.exports = {
  signupUser,
  signinUser,
  logout,
};
