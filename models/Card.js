import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Card = sequelize.define(
  "cards",
  {
    user_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "users",
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "products",
        key: "id",
      },
    },
    product_quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
  }
);

export default Card;
