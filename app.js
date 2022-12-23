const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')

dotenv.config();

const app = express()

// setting up Mongoose
const mongoose = require("mongoose");
const connectionString = process.env.MONGO_CONNECT

const store = new MongoDBStore({
  uri: connectionString,
  collection: 'sessions',
})

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
    }
      
      console.log("Successfully connected to MongoDB");
    }
);

const csrfProtection = csrf()

//  Routes
const adminRoutes = require("./routes/admin");
const shopRouter = require("./routes/shop");
const authRouter = require('./routes/authRouter')
const errorCtrl = require("./controllers/error");

const User = require("./models/userModel");

app.use(express.json());

app.set("view engine", "ejs");
app.set("views");


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use(session({
  secret: process.env.SESSSION_SEC,
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.use(csrfProtection)


app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn
  res.locals.csrfToken = req.csrfToken()
  next()
})

//Route middleware
app.use("/admin", adminRoutes);
app.use(shopRouter);
app.use(authRouter)

app.use("*", errorCtrl.pageNotFound);

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running successfully on port ${port} `);
});
