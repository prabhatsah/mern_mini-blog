const express = require("express");
const userRoute = require("./routes/userRoutes");
const blogRoute = require("./routes/blogRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
// app.use(cookieParser());

var corsOptions = {
  // origin: "http://localhost:5173",
  origin: ["http://localhost:5173", "http://mern-mini-blog-client.s3-website.ap-south-1.amazonaws.com"],
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).send(`Home route called`);
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

module.exports = app;
