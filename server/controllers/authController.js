const { getHash, checkHash } = require("../services/hashServices");
const {
  createUser,
  findUser,
  findPassword,
} = require("../services/authServices");
const { getToken } = require("../utils/authUtils");

const isloggedIn = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not authenticated");
    }
    const userInfo = await findUser(user.email);
    res.status(200).json({
      loggedIn: true,
      user: userInfo,
    });
  } catch (error) {
    console.error("Error in isLoggedIn:", error);
    res.status(401).json({
      loggedIn: false,
      error: "Authentication failed",
    });
  }
};
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const hash = await getHash(password);
      const newUser = await createUser(email, hash);
      const token = getToken({ email: email });
      res.cookie("accessToken", token, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      const user = await findUser(email);
      req.user = user;
      res.status(201).json({ message: "user added successfully", user: user });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "email already exists" });
    } else {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userPassword = await findPassword(email);
    if (userPassword && (await checkHash(password, userPassword))) {
      const token = getToken({ email: email });
      res.cookie("accessToken", token, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      const user = await findUser(email);
      req.user = user;
      res.status(200).json({ message: "login successfull", user: user });
    } else {
      res.status(401).json({ message: "email or password may be incorrect" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "loggedout successfully" });
  } catch (err) {
    console.log("Unable to log out", err);
    res.status(500).json({ messge: "Internal server error" });
  }
};
module.exports = { isloggedIn, signup, login, logout };
