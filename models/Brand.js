import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Brand = sequelize.define(
  "brands",
  {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING(2000),
    },
    img_url: {
      type: DataTypes.STRING,
      defaultValue: "default.png",
    },
  },
  {
    timestamps: true,
  }
);

export default Brand;
