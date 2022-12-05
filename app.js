const path = require('path')
const express = require('express');
const bodyParser = require('body-parser')

// const db = require('./util/database')

const adminRoutes = require('./routes/admin')
const shopRouter = require('./routes/shop')
const errorCtrl = require("./controllers/error");

// db.execute('SELECT * FROM products')
// .then((result) => {
//     console.log(result[0], result[1])
// })
// .catch(err => {
//     console.log(err)
// })

const app = express();

app.set('view engine', 'ejs')
app.set('views')

app.use(express.json({ extended: false}));
app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static(path.join(__dirname, 'public')));

//Route middleware
app.use('/admin', adminRoutes);
app.use(shopRouter)

app.use('*', errorCtrl.pageNotFound)

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
if (err) throw err;
console.log(`Server is running successfully on port ${port}`)
})