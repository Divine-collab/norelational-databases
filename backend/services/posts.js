
const Post = require("../models/post");

// Return all posts as an array.
async function findAll() {
  return Post.find().populate("author", "name email avatar");
}

// Return a single post by its id.
async function findById(id) {
  return Post.findById(id).populate("author", "name email avatar");
}

// Insert a new post from body.
async function create(body) {
  const post = await Post.create(body);
  return post.populate("author", "name email avatar");
}

// Update a post by id.
async function update(id, body) {
  return Post.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  }).populate("author", "name email avatar");
}

// Delete a post by id.
async function remove(id) {
  return Post.findByIdAndDelete(id);
}

module.exports = { findAll, findById, create, update, remove };
