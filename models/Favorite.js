import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Favorite = sequelize.define(
  "favorites",
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
  },
  {
    timestamps: true,
  }
);

export default Favorite;
