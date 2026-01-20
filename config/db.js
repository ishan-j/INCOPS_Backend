const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',      // Your MySQL username
//     password: 'password', // Your MySQL password
//     database: 'company_db',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// Export the promise-based version for cleaner async/await code


// config/db.js
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
module.exports = pool.promise();