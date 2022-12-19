const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;

const sequelize = require("./util/database");

// MiddleWares
const app = express();

app.set("view engine", "ejs");
app.set("views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//  Routes
const adminRoutes = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorCtrl = require("./controllers/error");

const User = require("./models/userModel");
const Product = require("./models/product");
const Cart = require("./models/cartModel");
const CartItem = require("./models/cart-items");
const Order = require("./models/orderModel");
const OrderItem = require("./models/order-items");

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

//Route middleware
app.use("/admin", adminRoutes);
app.use(shopRouter);

app.use("*", errorCtrl.pageNotFound);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Stephen", email: "stephen@gmail.com" });
    }
    return user;
  })
  // .then((user) => {
  //   return user.createCart();
  // })
  .then((cart) => {
    app.listen(port, () => {
      console.log(`Server is running successfully on port ${port} `);
    });
  })
  .catch((err) => {
    console.log(err);
  });
