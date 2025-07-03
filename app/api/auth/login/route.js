import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  await connectToDB();

  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Missing email or password" }), { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

 return new Response(
  JSON.stringify({
    token,
    email: user.email,
    username: user.username,
  }),
  {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  }
);
}
