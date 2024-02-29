const express = require("express");
const isAuthenticated = require("../middlewares/authMiddleware");
const {
  isloggedIn,
  signup,
  login,
  logout,
} = require("../controllers/authController");

const router = express.Router();

router.get("/isloggedin", isAuthenticated, isloggedIn);
router.post("/signup", signup);
router.post("/login", login);
router.delete("/logout", logout);
module.exports = router;
