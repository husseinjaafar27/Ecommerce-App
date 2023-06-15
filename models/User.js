import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const User = sequelize.define(
  "users",
  {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    year_of_birthday: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.ENUM(["Male", "Female"]),
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
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_logout: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true }
);

export default User;
