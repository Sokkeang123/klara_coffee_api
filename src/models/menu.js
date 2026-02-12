const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Menu = sequelize.define("Menu", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT, allowNull: false }
});

module.exports = Menu;
