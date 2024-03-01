const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connection = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@travel-blog.dqve5kp.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

app.use(
  cors()
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));

connection(URL);

app.get("/", (req, res) => {
  res.send("hello from server");
});
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
