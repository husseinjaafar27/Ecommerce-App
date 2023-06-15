import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Order = sequelize.define(
  "orders",
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
    promocode_id: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    order_number: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    payment_method: {
      type: DataTypes.STRING,
      defaultValue: "Cash",
    },
    status: {
      type: DataTypes.ENUM(["pending", "cancelled", "inprogress", "complete"]),
      defaultValue: "pending",
    },
    shipping_price: {
      type: DataTypes.DECIMAL,
    },
    sub_total: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
  }
);

export default Order;
