import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Shipping = sequelize.define(
  "shippings",
  {
    user_id: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "users",
        key: "id",
      },
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    building_name: {
      type: DataTypes.STRING,
    },
    region: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Shipping;
