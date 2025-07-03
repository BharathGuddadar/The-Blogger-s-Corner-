import mongoose from "mongoose";

const uri = "mongodb+srv://bharathps821:hbfhewlj4321cw32@cluster0.i26kikb.mongodb.net/authDB?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connected");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Connection Failed:", err.message);
  });
