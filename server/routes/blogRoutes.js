const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const isAuthenticated = require("../middlewares/authMiddleware");

const {
  createBlogPost,
  getFeaturedPosts,
  getTrendingPosts,
  getFeaturedBlog,
  getTrendingBlog,
  getBlogs,
  getBlog,
  getTitles,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

router.post(
  "/create-blog-post",
  upload.single("image"),
  function (req, res, next) {
    const base64Data = req.body.image.split(",")[1];
    const imgBuffer = Buffer.from(base64Data, "base64");
    const uniqueFilename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.jpeg`;
    const imagePath = path.resolve(__dirname, `../images/${uniqueFilename}`);
    fs.writeFileSync(imagePath, imgBuffer);
    req.imageUrl = `/images/${uniqueFilename}`;
    next();
  },
  isAuthenticated,
  createBlogPost
);
router.get("/featuredposts", getFeaturedPosts);
router.get("/trendingposts", getTrendingPosts);
router.get("/featuredblogs/:postId", getFeaturedBlog);
router.get("/trendingblogs/:postId", getTrendingBlog);
router.get("/recentblogs", getBlogs);
router.get("/titles", getTitles);
router.get("/:postId", getBlog);
router.delete("/:postId", isAuthenticated, deleteBlog);
module.exports = router;
