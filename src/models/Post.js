import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  content:     { type: String, required: true },
  author:      { type: String, required: true }, // Can be author ID or email
  createdAt:   { type: Date, default: Date.now },
  tags:        [String]
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
