"use client";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div style={{ textAlign: "center" }}>
      <AuthForm isLogin={true} />
      <p style={{ margin: 20 }}>
        Don't have an account?{" "}
        <Link href="/register" style={{ color: "	#f97316", textDecoration: "underline" }}>
          Register here
        </Link>
      </p>
    </div>
  );
}
