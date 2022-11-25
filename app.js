const express = require('express');

const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop')

const app = express();

app.use(express.json());

//Route middleware
app.use(adminRouter);
app.use(shopRouter)
app.use('*', (req, res, next) => {
res.send('<h2>oops this page cant be found!!!</h2>')
})

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
if (err) throw err;
console.log(`Server is running successfully on port ${3000}`)
})