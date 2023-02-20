const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const Register = async (req, res) => {
  const { name, email, password, gender, age, city } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.send({ msg: "User already exist, please login" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ msg: "Something went wrong", error: err });
        } else {
          await UserModel.create({
            name,
            email,
            password: hash,
            gender,
            age,
            city,
          });
          res.send({ msg: "User has been registered successfully" });
        }
      });
    }
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.send({ msg: "Something went wrong", error: err });
        } else {
          if (result) {
            const token = jwt.sign(
              { userID: user._id },
              process.env.secretKEY,
              { expiresIn: "1h" }
            );
            res.send({ msg: "User logged in successfully", token: token });
          } else {
            res.send({ msg: "Wrong Credentials" });
          }
        }
      });
    } else {
      res.send({ msg: "User not found" });
    }
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
};

module.exports = { Register, Login };
