const Delivery = require("../models/delivery");

exports.addDelivery = async (req, res) => {
  const { orderId, method, location } = req.body;
  const delivery = await Delivery.create({ orderId, method, location });
  res.json(delivery);
};
