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
    <main className="min-h-screen bg-[#1a1a1a] text-gray-100 px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-orange-500 tracking-tight">
          📝 Blogger’s Corner
        </h1>
        <p className="text-[#bdc3c7] mt-2 text-base sm:text-lg max-w-xl mx-auto">
          Discover articles, insights, and tutorials shared by passionate writers.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
        {/* Main Posts Section */}
        <div className="w-full lg:w-[65%] space-y-6">
          {posts.length === 0 ? (
            <p className="text-center text-[#ecf0f1] text-lg">No blog posts found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {posts.map((post) => (
                <Link
                  href={`/posts/${post._id}`}
                  key={post._id}
                  className="bg-white min-h-60 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition duration-300 p-5 border border-[#ddd]"
                >
                  <h2 className="text-2xl text-orange-600 font-semibold mb-2">{post.title}</h2>
                  <p className="text-[#4a3f35] mb-3 text-base leading-relaxed">
                    {post.content.slice(0, 300)}...
                  </p>
                  <div className="flex justify-between text-sm text-[#7f8c8d]">
                    <span>By {post.author || "Unknown"}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-3 text-[#2c3e50] font-semibold hover:underline transition">
                    Read More →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Section */}
        <div className="w-full lg:w-[35%]">
          <div className="sticky top-24 bg-[#faf7f0] text-[#2c3e50] p-5 rounded-xl shadow-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-3">📌 Recent Posts</h3>
            <ul className="space-y-2 text-sm text-orange-800">
              {posts.slice(0, 3).map((post) => (
                <li key={post._id}>
                  <Link href={`/posts/${post._id}`} className="hover:underline">
                    • {post.title.length > 40 ? post.title.slice(0, 40) + "..." : post.title}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-bold mt-5 mb-3">📚 Categories</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {["Tech", "AI", "Tutorials", "Tips", "Career", "Frontend"].map((tag) => (
                <span
                  key={tag}
                  className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 cursor-pointer transition"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h3 className="text-lg font-bold mt-5 mb-3">💡 Quote of the Day</h3>
            <blockquote className="text-sm italic text-gray-700 border-l-4 border-orange-400 pl-3">
              “The best way to get started is to quit talking and begin doing.” — Walt Disney
            </blockquote>
          </div>
        </div>
      </div>
    </main>
  );
}
