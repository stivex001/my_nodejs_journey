// const path = require('path')
const express = require("express");

// const rootDir = require('../util/path')
const adminCtrl = require('../controllers/adminController')

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminCtrl.getAddProducts)

// /admin/products => GET
router.get("/products", adminCtrl.getAdminProducts)

router.get('/edit-product/:productId', adminCtrl.getEditProducts)

router.post('/edit-product', adminCtrl.postEditProduct)

router.post('/delete-product', adminCtrl.postDeleteProduct)

  // /add-product => POST
  router.post('/add-product', adminCtrl.postProducts)

  module.exports = router