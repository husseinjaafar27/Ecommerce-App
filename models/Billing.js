import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Billing = sequelize.define(
  "billings",
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
    street_address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    region: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Billing;
