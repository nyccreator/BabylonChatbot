import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    passwordHash: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: null },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
