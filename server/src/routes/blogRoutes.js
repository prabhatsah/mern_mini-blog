const express = require("express");
const { createBlog, findBlogById, findBlogs, findAllOtherBlogs } = require("../controllers/blogController");
const { route } = require("./userRoutes");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(authMiddleware, createBlog).get(authMiddleware, findBlogs);
router.route("/other").get(authMiddleware, findAllOtherBlogs);
router.route("/:id").get(findBlogById);
// router.route("authorId/:authour_id").get(findBlogsByAuthorId);

module.exports = router;
