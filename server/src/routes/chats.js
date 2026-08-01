import { Router } from "express";
import mongoose from "mongoose";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

const isValidId = (id) => mongoose.isValidObjectId(id);

const findOwnedChat = async (chatId, userId) => {
  if (!isValidId(chatId)) return null;
  return Chat.findOne({ _id: chatId, userId });
};

router.get("/", async (req, res) => {
  const chats = await Chat.find({ userId: req.userId })
    .sort({ updatedAt: -1 })
    .select("title previousResponseId createdAt updatedAt");
  res.json(chats);
});

router.post("/", async (req, res) => {
  const { title } = req.body ?? {};
  const chat = await Chat.create({
    userId: req.userId,
    title: title?.trim() || "New chat",
  });
  res.status(201).json(chat);
});

router.patch("/:id", async (req, res) => {
  const chat = await findOwnedChat(req.params.id, req.userId);
  if (!chat) return res.status(404).json({ error: "chat not found" });
  const { title, previousResponseId } = req.body ?? {};
  if (typeof title === "string") chat.title = title.trim() || chat.title;
  if (typeof previousResponseId === "string" || previousResponseId === null) {
    chat.previousResponseId = previousResponseId;
  }
  await chat.save();
  res.json(chat);
});

router.delete("/:id", async (req, res) => {
  const chat = await findOwnedChat(req.params.id, req.userId);
  if (!chat) return res.status(404).json({ error: "chat not found" });
  await Message.deleteMany({ chatId: chat._id });
  await chat.deleteOne();
  res.json({ ok: true });
});

router.get("/:id/messages", async (req, res) => {
  const chat = await findOwnedChat(req.params.id, req.userId);
  if (!chat) return res.status(404).json({ error: "chat not found" });
  const messages = await Message.find({ chatId: chat._id })
    .sort({ createdAt: 1 })
    .select("role content createdAt");
  res.json(messages);
});

router.post("/:id/messages", async (req, res) => {
  const chat = await findOwnedChat(req.params.id, req.userId);
  if (!chat) return res.status(404).json({ error: "chat not found" });
  const { role, content } = req.body ?? {};
  if (!["user", "assistant"].includes(role)) {
    return res.status(400).json({ error: "invalid role" });
  }
  if (typeof content !== "string" || !content.length) {
    return res.status(400).json({ error: "content required" });
  }
  const message = await Message.create({ chatId: chat._id, role, content });
  chat.updatedAt = new Date();
  await chat.save();
  res.status(201).json(message);
});

export default router;
