import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Sub_Categories = sequelize.define(
  "sub_categories",
  {
    category_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "categories",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING(2000),
    },
  },
  {
    timestamps: true,
  }
);

export default Sub_Categories;
