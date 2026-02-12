const Menu = require("../models/menu");

// Get all menu items
exports.getAllMenu = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch menus", error: err.message });
  }
};

// Create a new menu item
exports.createMenu = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const menu = await Menu.create({ name, description, price });
    res.status(201).json(menu);
  } catch (err) {
    res.status(500).json({ message: "Failed to create menu", error: err.message });
  }
};

// Update a menu item
exports.updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const menu = await Menu.findByPk(id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    menu.name = name || menu.name;
    menu.description = description || menu.description;
    menu.price = price || menu.price;
    await menu.save();

    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: "Failed to update menu", error: err.message });
  }
};

// Delete a menu item
exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });

    await menu.destroy();
    res.json({ message: "Menu deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete menu", error: err.message });
  }
};
