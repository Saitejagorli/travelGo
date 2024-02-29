const User = require("../models/user");
const { userInfo, updateUser } = require("../services/userServices");
const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userInfo(userId);
    res.status(200).json(user);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(404).json({ message: "user not found" });
  }
};
const updateData = async (req, res) => {
  try {
    const userId = req.params.userId;
    await updateUser(userId, req.body, req.profilePhotoUrl);
    res.json({ message: "user data updated successfully" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { updateData, getUser };
