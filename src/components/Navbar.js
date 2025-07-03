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
    <nav className="bg-[#1a1a1a] text-white shadow-md sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Links */}
        <div className="flex items-center space-x-6 font-medium text-gray-200">
          
          <Link href="/" className="text-xl font-bold text-orange-500 "><h2>Blogger’s Corner</h2></Link>
          <Link href="/dashboard" className="hover:text-orange-500 transition"> Dashboard</Link>
        </div>

        {/* Right Links */}
        <div className="flex items-center space-x-4">
          {loggedIn ? (
            <>
              <span className="text-gray-300"> {username}</span>
              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded transition"
              >
                 Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded transition"
            >
               Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
