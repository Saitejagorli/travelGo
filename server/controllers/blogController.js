const {
  createBlog,
  findFeaturedPosts,
  findTrendingPosts,
  findFeaturedBlog,
  findTrendingBlog,
  findBlogs,
  findBlog,
  findBlogTitles,
  deletePostById,
} = require("../services/blogServices");

const createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.imageUrl;
    const author = req.user.email;
    await createBlog({ title, content, imageUrl, author });
    res.status(200).json({ message: "blog created successfully" });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).send("Internal Server Error");
  }
};
const getFeaturedPosts = async (req, res) => {
  try {
    const posts = await findFeaturedPosts();
    res.status(200).json(posts);
  } catch (err) {
    console.log("Error while fetching featured posts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getTrendingPosts = async (req, res) => {
  try {
    const posts = await findTrendingPosts();
    res.status(200).json(posts);
  } catch (err) {
    console.log("Error while fetching trending posts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getFeaturedBlog = async (req, res) => {
  try {
    const blog = await findFeaturedBlog(req.params.postId);
    res.status(200).json(blog);
  } catch (err) {
    console.log("Error while fetching the featured blog ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getTrendingBlog = async (req, res) => {
  try {
    const blog = await findTrendingBlog(req.params.postId);
    res.status(200).json(blog);
  } catch (err) {
    console.log("Error while fetching the trending blog");
    res.status(500).json({ message: "Internal server error" });
  }
};
const getBlogs = async (req, res) => {
  try {
    const blogs = await findBlogs();
    res.status(200).json(blogs);
  } catch (err) {
    console.log("Error while fetching  blogs");
    res.status(500).json({ message: "Internal server error" });
  }
};
const getBlog = async (req, res) => {
  try {
    const blog = await findBlog(req.params.postId);
    if (blog) {
      res.status(200).json(blog);
    } else {
      throw err;
    }
  } catch (err) {
    console.log("Error while fetching the blog", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const deletedPost = await deletePostById(req.user._id, req.params.postId);
    if (!deletedPost) {
      res.status(404).json({ message: "Blog post not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.error("Error while deleting the post:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getTitles = async (req, res) => {
  try {
    const posts = await findBlogTitles();
    res.status(200).json(posts);
  } catch (err) {
    console.log("Error while fetching  blogs titles", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  createBlogPost,
  getFeaturedPosts,
  getTrendingPosts,
  getFeaturedBlog,
  getTrendingBlog,
  getBlogs,
  getBlog,
  getTitles,
  deleteBlog,
};
