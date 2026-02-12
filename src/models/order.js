const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Order = sequelize.define("Order", {
  status: {
    type: DataTypes.ENUM("Pending", "Processing", "Completed"),
    defaultValue: "Pending"
  },
  totalCost: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

// Relation: each order belongs to a user
Order.belongsTo(User, { foreignKey: "userId" });

module.exports = Order;
