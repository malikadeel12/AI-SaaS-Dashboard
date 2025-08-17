import express from "express";
import Notification from "../models/Notification.js";
import { authenticate} from "../middleware/authMiddleware.js"; 

const router = express.Router();


router.get("/", authenticate, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const { userId, message } = req.body;
    if (!userId || !message) {
      return res.status(400).json({ error: "userId and message required" });
    }

    const notification = await Notification.create({
      user: userId,
      message,
    });

    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark as read
router.put("/:id/read", authenticate, async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(notif);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
