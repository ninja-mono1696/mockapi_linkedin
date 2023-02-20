const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.secretKEY, (err, decoded) => {
      if (decoded) {
        req.body.userID = decoded.userID;
        next();
      } else {
        res.send({ msg: "User not logged in" });
      }
    });
  } else {
    res.send({ msg: "User not logged in" });
  }
};

module.exports = { authenticate };
