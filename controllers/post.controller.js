const { PostModel } = require("../models/post.model");

const getPosts = async (req, res) => {
  const query = req.query;
  try {
    const posts = await PostModel.find({ userID: req.body.userID }, query);
    res.send(posts);
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
};

const topPost = async (req, res) => {
  try {
    const posts = await PostModel.find({ no_of_comments });
    res.send(posts);
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    await PostModel.create(req.body);
    res.send({ msg: "New post has been created" });
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findOne({ _id: id });
  const userID_in_post = post.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_in_post !== userID_making_req) {
      res.send({ msg: "The user is not authorized" });
    } else {
      await PostModel.findByIdAndUpdate(id, req.body);
      res.send({ msg: `Post with id: ${id} has been updated` });
    }
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findOne({ _id: id });
  const userID_in_post = post.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_in_post !== userID_making_req) {
      res.send({ msg: "The user is not authorized" });
    } else {
      await PostModel.findByIdAndDelete(id);
      res.send({ msg: `Post with id: ${id} has been deleted` });
    }
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
};

module.exports = { getPosts, topPost, createPost, updatePost, deletePost };
