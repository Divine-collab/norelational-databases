const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");

// Load seed data from the JSON files in data/
const usersData = require("./data/users.json");
const postsData = require("./data/posts.json");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blog_db";

async function main() {
  await mongoose.connect(URI);

  // TODO: delete all existing documents from the users collection
  await User.deleteMany({});

  // TODO: delete all existing documents from the posts collection
  await Post.deleteMany({});

  await User.insertMany(usersData);

  await Post.insertMany(postsData);

  const [userCount, postCount] = await Promise.all([
    User.countDocuments(),
    Post.countDocuments(),
  ]);
  console.log(`Inserted ${userCount} users and ${postCount} posts.`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
