const User = require("../models/user");
const FeaturedPost = require("../models/featuredPost");
const TrendingPost = require("../models/trendingPost");
const Blog = require("../models/blog");

const mongoose = require("mongoose");
const { deleteImageFromServer } = require("../utils/deleteImageFromServer");
const { ObjectId } = mongoose.Types;

const userInfo = async (userId) => {
  try {
    const user = await User.findById({ _id: new ObjectId(userId) })
      .select("-password")
      .lean();
    if (user) {
      const postIds = user.blogPosts;
      const blogs = await Blog.find({ _id: { $in: postIds } })
        .select("-comments")
        .sort({ date: -1 })
        .lean();
      const featuredBlogs = await FeaturedPost.find({
        _id: { $in: postIds },
      })
        .select("-comments")
        .sort({ date: -1 })
        .lean();
      const trendingBlogs = await TrendingPost.find({
        _id: { $in: postIds },
      })
        .select("-comments")
        .sort({ date: -1 })
        .lean();
      const posts = [...blogs, ...featuredBlogs, ...trendingBlogs];
      return { ...user, blogPosts: posts };
    }
    return user;
  } catch (err) {
    throw err;
  }
};
const updateUser = async (
  userId,
  { fullName, location, bio },
  profilePhotoUrl
) => {
  try {
    const { profilePhoto } = await User.findById({
      _id: new ObjectId(userId),
    }).select("profilePhoto");
    await User.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          fullName: fullName,
          location: location,
          bio: bio,
          profilePhoto: profilePhotoUrl,
        },
      }
    );
    profilePhoto && (await deleteImageFromServer(profilePhoto));
  } catch (err) {
    throw err;
  }
};
module.exports = { userInfo, updateUser };
