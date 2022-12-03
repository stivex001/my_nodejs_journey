const path = require("path");
const express = require("express");

const productsCtrl = require("../controllers/products");

const router = express.Router();

router.get("/", productsCtrl.getIndex);

router.get("/products", productsCtrl.getProducts);

router.get("/products/:productId", productsCtrl.getProduct);

router.get("/checkout", productsCtrl.getCheckout);

router.get("/cart", productsCtrl.getCart);

router.post('/cart', productsCtrl.postCart);

router.get("/orders", productsCtrl.getOrders);

module.exports = router;
