const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./order");
const Menu = require("./menu");

const OrderItem = sequelize.define("OrderItem", {
  quantity: { type: DataTypes.INTEGER, allowNull: false }
});

OrderItem.belongsTo(Order, { foreignKey: "orderId" });
OrderItem.belongsTo(Menu, { foreignKey: "menuId" });

module.exports = OrderItem;
