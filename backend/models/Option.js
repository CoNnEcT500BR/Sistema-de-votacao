const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define o modelo Option
const Option = sequelize.define(
  "option",
  {
    text: { type: DataTypes.TEXT, allowNull: false },
    order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    pollId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  },
);

module.exports = Option;
