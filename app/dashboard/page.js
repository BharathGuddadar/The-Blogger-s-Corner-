"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchPosts = async () => {
    const email = localStorage.getItem("email");
    const res = await fetch(`/api/posts?email=${email}`);
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-email": email,
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      setTitle("");
      setContent("");
      fetchPosts();
    } else {
      alert("Failed to add post");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchPosts();
    } else {
      alert("Failed to delete the post.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });

    if (res.ok) {
      setEditId(null);
      setEditTitle("");
      setEditContent("");
      fetchPosts();
    } else {
      alert("Update failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Dashboard</h1>

      {/* Add Post Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-8 space-y-4">
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded text-gray-900"
        />
        <textarea
          placeholder="Write your content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-2 border rounded text-gray-900"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          ➕ Add Post
        </button>
      </form>

      {/* Posts List */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-900">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow rounded p-6 mb-6"
          >
            {editId === post._id ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border rounded"
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    💾 Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditId(null)}
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                <p className="text-gray-900 mt-2">{post.content}</p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {
                      setEditId(post._id);
                      setEditTitle(post.title);
                      setEditContent(post.content);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
