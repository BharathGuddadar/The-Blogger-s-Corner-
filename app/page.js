"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">📝 Blogger’s Hub</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Explore the latest stories, thoughts, and tutorials from the community.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {posts.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">No blog posts found.</p>
        ) : (
          posts.map((post) => (
            <Link
              href={`/posts/${post._id}`}
              key={post._id}
              className="bg-white rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200 p-6"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">
                {post.content.slice(0, 130)}...
              </p>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>By {post.author || "Unknown"}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="text-blue-600 font-semibold mt-2">Read More →</div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
