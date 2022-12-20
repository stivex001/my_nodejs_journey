const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// setting up Mongoose
const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://baistevoo:nWfQZxquK0y3O6sp@cluster0.4nljvas.mongodb.net/my_shop?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      User.findOne().then(user => {
        if (!user) {
          const user = new User({
        name: "stephen",
        email: "stephen@example.com",
        cart: {
          items: [],
        },
      });
      user.save();
        }
      })
      
      console.log("Successfully connected to MongoDB");
    }
  }
);

//  Routes
const adminRoutes = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorCtrl = require("./controllers/error");

const User = require("./models/userModel");

const app = express();

app.set("view engine", "ejs");
app.set("views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("63a172adbb80525aa7819d84")
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => {
      console.log(err);
    });
});

//Route middleware
app.use("/admin", adminRoutes);
app.use(shopRouter);

app.use("*", errorCtrl.pageNotFound);

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running successfully on port ${port} `);
});
