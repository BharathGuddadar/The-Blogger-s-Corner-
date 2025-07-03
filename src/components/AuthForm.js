"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({ isLogin }) {
  const router = useRouter();

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin
      ? { email: form.email, password: form.password }
      : form;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        if (isLogin) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", form.email);
          localStorage.setItem("username", data.username);
          window.dispatchEvent(new Event("authChange"));
          router.push("/dashboard");
        } else {
          alert("Registration successful! You can now login.");
          setForm({ username: "", email: "", password: "" });
          router.push("/login");
        }
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "80px auto",
        padding: "30px 25px",
        borderRadius: 10,
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        background: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center",color:"black", marginBottom: 25 }}>
        {isLogin ? "Welcome Back" : "Join as a Blogger"}
      </h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block",color:"black", marginBottom: 6 }}>Username</label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block",color:"black", marginBottom: 6 }}>Email</label>
          <input
            name="email"
            type="email"

            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block",color:"black", marginBottom: 6 }}>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#1e88e5",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 16,
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1565c0")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1e88e5")}
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>

        {error && (
          <p style={{ color: "red", marginTop: 15, textAlign: "center" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  color:"black",
  border: "1px solid #ccc",
  borderRadius: 6,
  fontSize: 14,
};
