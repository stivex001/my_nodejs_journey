const path = require('path')
const express = require("express");

const rootDir = require('../util/path')
const adminData = require('./admin')

const router = express.Router();

router.get("/", (req, res) => {
  res.render('shop')
  // console.log('shop', adminData.products)
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
