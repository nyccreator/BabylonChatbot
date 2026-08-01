import { Router } from "express";
import { User } from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.patch("/", requireAuth, async (req, res) => {
  const { rating } = req.body ?? {};
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "rating must be an integer 1-5" });
  }
  await User.findByIdAndUpdate(req.userId, { rating });
  res.json({ ok: true });
});

router.get("/stats", async (_req, res) => {
  const [result] = await User.aggregate([
    { $match: { rating: { $ne: null } } },
    {
      $group: {
        _id: null,
        average: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);
  res.json({ average: result?.average ?? 0, count: result?.count ?? 0 });
});

export default router;
