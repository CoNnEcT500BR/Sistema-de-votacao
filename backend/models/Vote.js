const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define o modelo Vote
const Vote = sequelize.define(
  "vote",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    optionId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  },
);

module.exports = Vote;
