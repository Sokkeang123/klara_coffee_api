const Payment = require("../models/payment");
const Order = require("../models/order");
const qrcode = require("qrcode");

// Create a payment
exports.addPayment = async (req, res) => {
  try {
    const { orderId, method, amount } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const payment = await Payment.create({
      orderId,
      method,
      amount,
      status: "Pending"
    });

    let qrCode = null;
    if (method === "QR") {
      const paymentData = `order:${orderId}|amount:${amount}`;
      qrCode = await qrcode.toDataURL(paymentData);
    }

    res.json({
      message: "Payment created",
      payment,
      qrCode
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create payment", error: err.message });
  }
};

// Confirm payment
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;
    const payment = await Payment.findByPk(paymentId, { include: Order });
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    payment.status = "Paid";
    await payment.save();

    // Update order status once payment is confirmed
    if (payment.Order) {
      payment.Order.status = "Completed";
      await payment.Order.save();
    }

    res.json({ message: "Payment confirmed", payment });
  } catch (err) {
    res.status(500).json({ message: "Failed to confirm payment", error: err.message });
  }
};
