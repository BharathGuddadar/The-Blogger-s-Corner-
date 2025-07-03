import { connectToDB } from "@/utils/db";
import Post from "@/models/Post";

export default async function PostPage({ params }) {
  const { id } = await params; 

  await connectToDB();
  const post = await Post.findById(id);

  if (!post) return <div className="text-center text-gray-700 py-10">Post not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <article className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>

        <div className="mb-6 text-sm text-gray-600 flex justify-between items-center">
          <p><strong>Author:</strong> {post.author}</p>
          <p>{new Date(post.createdAt).toLocaleString()}</p>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
        <div className="text-center mt-8">
        <a href="/" className="text-orange-600 hover:underline">← Back to Home</a>
        </div>

      </article>
    </div>
  );
}
