const Blog = require("../model/BlogSchema");

async function createBlog(req, res) {
  try {
    const { title, excerpt, content, category, image, read_time } = req.body;
    const author_id = req.user._id;
    const author_name = req.user.name;

    if (!title || !excerpt || !content || !category || !image || !read_time || !author_id || !author_name)
      return res.status(400).json({ message: "All fields are mendatory", success: false });

    const blog = await Blog.create({ title, excerpt, content, category, image, read_time, author_id, author_name });

    if (!blog) return res.status(400).json({ message: "Blog create failed", success: false });

    return res.status(201).json({ message: "Blog created", success: true });
  } catch (error) {
    console.error(error);
  }
}

async function findBlogById(req, res) {
  const id = req.params.id;

  if (!id) return res.status(400).json({ message: "Blog id missing", success: false });

  const blog = await Blog.findById({ _id: id });

  if (!blog) return res.status(400).json({ message: "Blog not found", success: false });

  return res.status(202).json({ message: "Blog found", success: true, data: blog });
}

async function findBlogs(req, res) {
  const author_id = req.user._id;

  if (!author_id) return res.status(400).json({ message: "Author id missing", success: false });

  const blogs = await Blog.find({ author_id });

  if (!blogs) return res.status(400).json({ message: "Blog not found", success: false });

  return res.status(202).json({ message: "Blog found", success: true, data: blogs });
}

async function findAllOtherBlogs(req, res) {
  const author_id = req.user._id;

  if (!author_id) return res.status(400).json({ message: "Author id missing", success: false });

  const blogs = await Blog.find({ author_id: { $ne: author_id } });

  if (!blogs) return res.status(400).json({ message: "Blog not found", success: false });

  return res.status(202).json({ message: "Blog found", success: true, data: blogs });
}

module.exports = { createBlog, findBlogById, findBlogs, findAllOtherBlogs };
