const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
const { authenticate } = require("./middlewares/authenticate.middleware");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WELCOME TO HOME PAGE");
});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", postRouter);

app.listen(PORT, async (req, res) => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Connected to the server at http://localhost:${PORT}`);
});
