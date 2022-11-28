const path = require('path')
const express = require('express');

const adminData = require('./routes/admin')
const shopRouter = require('./routes/shop')

const app = express();

app.set('view engine', 'ejs')
app.set('views')

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//Route middleware
app.use('/admin', adminData.routes);
app.use(shopRouter)

app.use('*', (req, res, next) => {
    res.render('404', {pageTitle: 'page not found'})
// res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
if (err) throw err;
console.log(`Server is running successfully on port ${3000}`)
})