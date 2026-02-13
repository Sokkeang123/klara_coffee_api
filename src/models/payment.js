const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./order");

const Payment = sequelize.define("Payment", {
  method: {
    type: DataTypes.ENUM("QR", "Card", "Cash"),
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM("Pending", "Paid", "Failed"),
    defaultValue: "Pending",
  },
});

// Relation: each payment belongs to an order
Payment.belongsTo(Order, { foreignKey: "orderId" });
Order.hasMany(Payment, { foreignKey: "orderId" });

module.exports = Payment;
