import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { requireAuth, signToken, cookieOptions } from "../middleware/auth.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "password must be at least 6 chars" });
  }
  const existing = await User.findOne({ username });
  if (existing) return res.status(409).json({ error: "username taken" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, passwordHash });
  res.cookie("token", signToken(user._id.toString()), cookieOptions());
  res.json({ id: user._id, username: user.username, rating: user.rating });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: "invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "invalid credentials" });
  res.cookie("token", signToken(user._id.toString()), cookieOptions());
  res.json({ id: user._id, username: user.username, rating: user.rating });
});

router.post("/logout", (_req, res) => {
  res.clearCookie("token", cookieOptions());
  res.json({ ok: true });
});

router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.userId).select("username rating");
  if (!user) return res.status(401).json({ error: "user not found" });
  res.json({ id: user._id, username: user.username, rating: user.rating });
});

export default router;
