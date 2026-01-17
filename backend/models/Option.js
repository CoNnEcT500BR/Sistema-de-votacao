const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Option = sequelize.define(
  "Option",
  {
    text: { type: DataTypes.TEXT, allowNull: false },
    order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  {
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

module.exports = Option;
