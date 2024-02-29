const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const FeaturedPost = require("../models/featuredPost");
const TrendingPost = require("../models/trendingPost");
const User = require("../models/user");
const Blog = require("../models/blog");
const { deleteImageFromServer } = require("../utils/deleteImageFromServer");

const createBlog = async ({ title, content, imageUrl, author }) => {
  try {
    const newBlog = await Blog.create({
      title: title,
      content: content,
      image: imageUrl,
      author: author,
    });
    await User.updateOne(
      { email: author },
      { $push: { blogPosts: newBlog._id } }
    );
  } catch (err) {
    throw err;
  }
};
const findFeaturedPosts = async () => {
  try {
    const posts = await FeaturedPost.find({});
    return posts;
  } catch (err) {
    console.log("Error while fetching the featured posts", err.message);
    throw err;
  }
};
const findTrendingPosts = async () => {
  try {
    const posts = await TrendingPost.find({});
    return posts;
  } catch (err) {
    console.log("Error while fetching the featured posts", err.message);
    throw err;
  }
};
const findFeaturedBlog = async (postId) => {
  try {
    const blog = await FeaturedPost.findById({ _id: new ObjectId(postId) });
    return blog;
  } catch (err) {
    throw err;
  }
};
const findTrendingBlog = async (postId) => {
  try {
    const blog = await TrendingPost.findById({ _id: new ObjectId(postId) });
    return blog;
  } catch (err) {
    throw err;
  }
};
const findBlogs = async () => {
  try {
    const blogs = await Blog.find({}).sort({ date: -1 }).limit(6);
    return blogs;
  } catch (err) {
    throw err;
  }
};
const findBlog = async (postId) => {
  try {
    const blog = await Blog.findById({ _id: new ObjectId(postId) });
    return blog || {};
  } catch (err) {
    throw err;
  }
};
const findBlogTitles = async () => {
  try {
    const posts = await Blog.find({}).select("title");
    return posts;
  } catch (err) {
    throw err;
  }
};
const deletePostById = async (userId, postId) => {
  try {
    const blogPost = await Blog.findById(postId);
    if (!blogPost) {
      return null;
    }
    const deletedPost = await Blog.deleteOne({ _id: new ObjectId(postId) });
    if (deletedPost.deletedCount === 0) {
      return null;
    }
    await User.findByIdAndUpdate(
      userId,
      { $pull: { blogPosts: new ObjectId(postId) } },
      { new: true }
    );
    const imagePath = blogPost.image;
    await deleteImageFromServer(imagePath);
    return deletedPost;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createBlog,
  findFeaturedPosts,
  findTrendingPosts,
  findFeaturedBlog,
  findTrendingBlog,
  findBlogs,
  findBlog,
  findBlogTitles,
  deletePostById,
};
