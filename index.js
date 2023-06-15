import express, { urlencoded, json } from "express";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

import sequelize from "./database.js";
import "./associations.js";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import categoryRoute from "./routes/category.js";
import brandRoute from "./routes/brand.js";
import cardRoute from "./routes/card.js";
import orderRoute from "./routes/order.js";
import shippingRoute from "./routes/shipping.js";
import billingRoute from "./routes/billing.js";
import sub_categoryRoute from "./routes/sub_category.js";
import favoriteRoute from "./routes/favorite.js";

import paymentRoute from "./routes/payment.js";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use(json());

// routes
app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/brand", brandRoute);
app.use("/card", cardRoute);
app.use("/order", orderRoute);
app.use("/shipping", shippingRoute);
app.use("/billing", billingRoute);
app.use("/sub_category", sub_categoryRoute);
app.use("/favorite", favoriteRoute);

app.use("/payment", paymentRoute);

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
