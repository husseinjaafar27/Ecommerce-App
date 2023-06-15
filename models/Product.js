import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Product = sequelize.define("products", {
  brand_id: {
    type: DataTypes.INTEGER,
    onDelete: "CASCADE",
    references: {
      model: "brands",
      key: "id",
    },
  },
  category_id: {
    type: DataTypes.INTEGER,
    onDelete: "CASCADE",
    references: {
      model: "categories",
      key: "id",
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
  },
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
  price: {
    type: DataTypes.DECIMAL,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default Product;
