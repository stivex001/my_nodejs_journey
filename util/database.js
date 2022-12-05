const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'my_node_journey',
    password: 'oladunjoye'
})

module.exports = pool.promise()