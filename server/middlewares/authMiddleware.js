const { findUser } = require("../services/authServices");
const { verifyToken } = require("../utils/authUtils");

const isAuthenticated = async (req, res, next) => {
  try {
    const accessToken = req.cookies ? req.cookies.accessToken : null;
    if (accessToken) {
      const decoded = verifyToken(accessToken);
      req.user = await findUser(decoded.email);
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    res.status(403).json({ error: "Forbidden" });
  }
};

module.exports = isAuthenticated;
