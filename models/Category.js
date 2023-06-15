import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Category = sequelize.define(
  "categories",
  {
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

export default Category;
