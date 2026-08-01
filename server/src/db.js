import mongoose from "mongoose";

export const connectDB = async (uri) => {
  if (!uri) throw new Error("MONGO_URI is not set");
  await mongoose.connect(uri);
  console.log("MongoDB connected");
};
