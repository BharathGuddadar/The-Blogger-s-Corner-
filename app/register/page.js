"use client";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div style={{ textAlign: "center" }}>
      <AuthForm isLogin={false} />
      <p style={{ marginTop: 20 }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#1e88e5", textDecoration: "underline" }}>
          Login here
        </Link>
      </p>
    </div>
  );
}
