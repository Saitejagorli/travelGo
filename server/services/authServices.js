const User = require("../models/user");

const createUser = async (email, password) => {
  try {
    const newUser = await User.create({ email: email, password: password });
    return newUser;
  } catch (err) {
    throw err;
  }
};
const findUser = async (email) => {
  try {
    const user = await User.findOne({ email }).select("email profilePhoto");
    return user;
  } catch (err) {
    throw err;
  }
};

const findPassword = async (email) => {
  try {
    const user = await User.findOne({ email }).select("password");
    return user.password;
  } catch (err) {
    throw err;
  }
};
module.exports = { createUser, findUser, findPassword };
