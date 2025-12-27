const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String },
    content: { type: String },
    category: { type: String },
    image: { type: String },
    read_time: { type: Number },
    author_id: { type: Schema.Types.ObjectId, ref: "BlogUser", required: true },
    author_name: { type: String, default: "Anonymous" },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
