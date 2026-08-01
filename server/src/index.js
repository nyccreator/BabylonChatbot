import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chats.js";
import ratingRoutes from "./routes/rating.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/rating", ratingRoutes);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
};

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
