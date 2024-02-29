const path = require("path");

const deleteImageFromServer = async (imagePath) => {
  const fs = require("fs").promises;
  try {
    await fs.unlink(path.resolve(__dirname, `../${imagePath}`));
  } catch (error) {
    throw error;
  }
};

module.exports = { deleteImageFromServer };
