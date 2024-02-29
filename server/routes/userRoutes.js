const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const isAuthenticated = require("../middlewares/authMiddleware");
const { getUser, updateData } = require("../controllers/userController");

router.get("/:userId", getUser);
router.post(
  "/update/:userId",
  upload.single("profilePhoto"),
  function (req, res, next) {
    const base64Data = req.body.profilePhoto.split(",")[1];
    const imgBuffer = Buffer.from(base64Data, "base64");
    const uniqueFilename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.jpeg`;
    const imagePath = path.resolve(__dirname, `../images/${uniqueFilename}`);
    fs.writeFileSync(imagePath, imgBuffer);
    req.profilePhotoUrl = `/images/${uniqueFilename}`;
    next();
  },
  isAuthenticated,
  updateData
);
module.exports = router;
