const Item = require("../models/Item");

// add
const addItem = async (req, res) => {
  try {
    const item = await Item.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(item);
  } catch {
    res.status(500).json({ message: "Add failed" });
  }
};

// get all
const getItems = async (req, res) => {
  const items = await Item.find().populate("user", "name email");
  res.json(items);
};

// delete
const deleteItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "Not allowed" });
  }

  await item.deleteOne();
  res.json({ message: "Deleted" });
};

// search
const searchItems = async (req, res) => {
  const items = await Item.find({
    itemName: { $regex: req.query.name, $options: "i" },
  });
  res.json(items);
};

module.exports = { addItem, getItems, deleteItem, searchItems };