"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("username");
      setLoggedIn(!!token);
      setUsername(user || "");
    };

    checkAuth();
    window.addEventListener("authChange", checkAuth);
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("authChange", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    window.dispatchEvent(new Event("authChange"));
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-2 py-4 flex items-center justify-between">
        {/* Left Links */}
        <div className="flex items-center space-x-6 text-gray-800 font-medium">
          <Link href="/" className="hover:text-blue-600 transition">
            🏠Home
          </Link>
          <Link href="/dashboard" className="hover:text-blue-600 transition">
            📋Dashboard
          </Link>
        </div>

        {/* Right Links */}
        <div className="flex items-center space-x-4">
          {loggedIn ? (
            <>
              <span className="text-gray-700 font-semibold">👤 {username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded transition"
            >
              🔐 Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
