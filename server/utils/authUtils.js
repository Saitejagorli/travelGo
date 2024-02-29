const { sign, verify } = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

const getToken = (data) => {
  return sign(data, secretKey, { expiresIn: "2 days" });
};

const verifyToken = (token) => {
  return verify(token, secretKey);
};

module.exports = { getToken, verifyToken };
