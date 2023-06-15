import Brand from "./models/Brand.js";
import Category from "./models/Category.js";
import Favorite from "./models/Favorite.js";
import Product from "./models/Product.js";
import Sub_Category from "./models/Sub_category.js";
import User from "./models/User.js";

// Brand - Product
Brand.hasMany(Product, {
  foreignKey: "brand_id",
});
Product.belongsTo(Brand, {
  foreignKey: "brand_id",
});

// Category - Product
Category.hasMany(Product, {
  foreignKey: "category_id",
});
Product.belongsTo(Category, {
  foreignKey: "category_id",
});

// Category - Sub_Category
Category.hasMany(Sub_Category, {
  foreignKey: "category_id",
});
Sub_Category.belongsTo(Category, {
  foreignKey: "category_id",
});

// User - Favorite
User.hasMany(Favorite, {
  foreignKey: "user_id",
});
Favorite.belongsTo(User, {
  foreignKey: "user_id",
});

// Product - Favorite
Product.hasMany(Favorite, {
  foreignKey: "product_id",
});
Favorite.belongsTo(Product, {
  foreignKey: "product_id",
});
