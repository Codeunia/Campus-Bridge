const mysql = require('mysql2');

// Use Render's environment variables or fallback to local settings
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || process.env.PLANETSCALE_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || process.env.PLANETSCALE_USER || 'root',
  password: process.env.MYSQL_PASSWORD || process.env.PLANETSCALE_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || process.env.PLANETSCALE_DATABASE || 'lms'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

module.exports = connection;