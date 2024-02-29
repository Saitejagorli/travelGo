const mongoose = require("mongoose");

const featuredPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const FeaturedPost = mongoose.model("FeaturedPost", featuredPostSchema);

module.exports = FeaturedPost;
