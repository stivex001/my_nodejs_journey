const Sequelize = require("sequelize");

const sequelize = new Sequelize("my_node_journey", "root", "oladunjoye", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'my_node_journey',
//     password: 'oladunjoye'
// })

// module.exports = pool.promise()
