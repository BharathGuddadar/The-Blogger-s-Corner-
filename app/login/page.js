"use client";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div style={{ textAlign: "center" }}>
      <AuthForm isLogin={true} />
      <p style={{ marginTop: 20 }}>
        Don't have an account?{" "}
        <Link href="/register" style={{ color: "#1e88e5", textDecoration: "underline" }}>
          Register here
        </Link>
      </p>
    </div>
  );
}
