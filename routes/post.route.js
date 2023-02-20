const express = require("express");
const {
  getPosts,
  topPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.get("/top", topPost);
postRouter.post("/create", createPost);
postRouter.patch("/update/:id", updatePost);
postRouter.delete("/delete/:id", deletePost);

module.exports = { postRouter };
