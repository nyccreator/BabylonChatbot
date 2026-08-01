import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, default: "New chat", maxlength: 200 },
    previousResponseId: { type: String, default: null },
  },
  { timestamps: true },
);

export const Chat = mongoose.model("Chat", chatSchema);
