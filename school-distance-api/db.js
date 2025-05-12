const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 11,
    queueLimit: 0,
}).promise();

// pool.query('SELECT NOW()', (err, results) => {
//     if (err) {
//         console.error('Test query connection error:', err);
//     } else {
//         console.log('Test connected:', results);
//     }
// });


module.exports = pool;