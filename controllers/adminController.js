const Product = require("../models/product");

exports.getAddProducts = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.getEditProducts = (req, res) => {
  const editMode = req.query.editMode
  if (!wditMode) {
    res.redirect('/')
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if(!product) {
      return res.redirect('/')
    }
  })
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode
  });
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.postProducts = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.getAdminProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};
