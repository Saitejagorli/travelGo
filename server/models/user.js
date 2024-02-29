const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  profilePhoto: {
    type: String,
  },
  blogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
