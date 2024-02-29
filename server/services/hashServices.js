const bcrypt = require("bcrypt");

const saltRounds = 10;

const getHash = (password) => {
  try {
    return bcrypt.hash(password, saltRounds);
  } catch (err) {
    throw err;
  }
};

const checkHash = (password, hash) => {
  try {
    return bcrypt.compare(password, hash);
  } catch (err) {
    throw err;
  }
};

module.exports = { getHash, checkHash };
