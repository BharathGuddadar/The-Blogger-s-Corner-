import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true // ⏱️ createdAt and updatedAt will be added automatically
});


const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
