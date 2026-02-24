const User = require("../models/user");

exports.getCustomers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: "User" },
      attributes: ["id", "name", "phone"], // add email if you want
      order: [["id", "DESC"]],
    });

    // You can return orders later
    const result = users.map((u) => ({
      id: u.id,
      name: u.name,
      phone: u.phone,
      orders: 0,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch customers", error: err.message });
  }
};