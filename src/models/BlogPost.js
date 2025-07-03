import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String }, // Optional enhancement
  },
  { timestamps: true }
);

const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
export default BlogPost;
