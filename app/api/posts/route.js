import { connectToDB } from "@/utils/db";
import Post from "@/models/Post";

// CREATE a new post
export async function POST(request) {
  await connectToDB();

  const { title, content } = await request.json();

  // ✅ Get the logged-in user's email from the custom header
  const author = request.headers.get("x-user-email");

  if (!title || !content || !author) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }

  try {
    const post = await Post.create({ title, content, author });
    return new Response(JSON.stringify({ message: "Post created", post }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to create post" }), { status: 500 });
  }
}

// GET all posts
export async function GET(request) {
  await connectToDB();

  const url = new URL(request.url);
  const userEmail = url.searchParams.get("email");

  try {
    const query = userEmail ? { author: userEmail } : {};
    const posts = await Post.find(query).sort({ createdAt: -1 });
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), { status: 500 });
  }
}

