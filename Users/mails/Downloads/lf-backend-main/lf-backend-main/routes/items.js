const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const { protect } = require("../middleware/authMiddleware");

// 🔍 SEARCH (keep before /:id)
router.get("/search", protect, async (req, res) => {
  try {
    const query = {};
    if (req.query.name)
      query.itemName = { $regex: req.query.name, $options: "i" };

    const items = await Item.find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ items }); // ✅ consistent
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➕ ADD ITEM
router.post("/", protect, async (req, res) => {
  try {
    const { itemName, description, type, location, date, contactInfo } = req.body;

    if (!itemName || !description || !type || !location || !contactInfo) {
      return res.status(400).json({ message: "All fields required." });
    }

    const item = await Item.create({
      itemName,
      description,
      type,
      location,
      date,
      contactInfo,
      user: req.user._id, // ✅ use "user"
    });

    res.status(201).json({ item }); // ✅ consistent
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📄 GET ALL
router.get("/", protect, async (req, res) => {
  try {
    const items = await Item.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ items }); // ✅ consistent
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ❌ DELETE
router.delete("/:id", protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Item not found." });

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    await item.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;