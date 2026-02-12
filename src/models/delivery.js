const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./order");

const Delivery = sequelize.define("Delivery", {
  method: { type: DataTypes.ENUM("Pickup", "Delivery"), allowNull: false },
  location: { type: DataTypes.STRING }
});

Delivery.belongsTo(Order, { foreignKey: "orderId" });

module.exports = Delivery;
