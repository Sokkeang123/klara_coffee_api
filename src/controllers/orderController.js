const Order = require("../models/order");
const OrderItem = require("../models/orderItem");

exports.createOrder = async (req, res) => {
  const { items, totalCost } = req.body;
  const order = await Order.create({ userId: req.user.id, totalCost });
  for (let item of items) {
    await OrderItem.create({ orderId: order.id, menuId: item.menuId, quantity: item.quantity });
  }
  res.json(order);
};
