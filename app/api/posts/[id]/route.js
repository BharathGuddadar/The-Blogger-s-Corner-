import { connectToDB } from "@/utils/db";
import Post from "@/models/Post";

// PUT: Update a post by ID
export async function PUT(req, context) {
  const params = await context.params;
  const { id } = params;
  await connectToDB();
  const { title, content } = await req.json();

  if (!title || !content) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Update failed" }), {
      status: 500,
    });
  }
}

// DELETE: Remove a post by ID
export async function DELETE(req, context) {
  const params = await context.params;   // await params here
  const { id } = params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Post deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Delete failed" }), {
      status: 500,
    });
  }
}
