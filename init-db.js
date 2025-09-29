// Database initialization script for Campus Bridge
// This script creates the necessary tables if they don't exist

const db = require('./db');

// Create users table
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_verified TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

// Create learning_resources table (if it doesn't exist)
const createLearningResourcesTable = `
  CREATE TABLE IF NOT EXISTS learning_resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL
  )
`;

console.log('Initializing database tables...');

// Create users table
db.query(createUsersTable, (err, result) => {
  if (err) {
    console.error('Error creating users table:', err);
    return;
  }
  console.log('Users table created or already exists');
  
  // Create learning_resources table
  db.query(createLearningResourcesTable, (err, result) => {
    if (err) {
      console.error('Error creating learning_resources table:', err);
      return;
    }
    console.log('Learning resources table created or already exists');
    
    // Check if is_verified column exists
    const checkColumnQuery = "SHOW COLUMNS FROM users LIKE 'is_verified'";
    
    db.query(checkColumnQuery, (err, results) => {
      if (err) {
        console.error('Error checking for is_verified column:', err);
        return;
      }
      
      if (results.length === 0) {
        // Column doesn't exist, add it
        const addColumnQuery = "ALTER TABLE users ADD COLUMN is_verified TINYINT(1) DEFAULT 0";
        
        db.query(addColumnQuery, (err, result) => {
          if (err) {
            console.error('Error adding is_verified column:', err);
          } else {
            console.log('is_verified column added successfully');
          }
          
          // Continue with sample user creation
          createSampleUser();
        });
      } else {
        console.log('is_verified column already exists');
        // Continue with sample user creation
        createSampleUser();
      }
    });
  });
});

function createSampleUser() {
  // Check if sample user already exists
  const checkUserExists = "SELECT COUNT(*) as count FROM users WHERE email = 'test@example.com'";
  
  db.query(checkUserExists, (err, results) => {
    if (err) {
      console.error('Error checking for sample user:', err);
      db.end();
      return;
    }
    
    if (results[0].count === 0) {
      // User doesn't exist, insert it
      const insertSampleUser = `
        INSERT INTO users (name, email, password, is_verified) 
        VALUES ('Test User', 'test@example.com', 'password123', 1)
      `;
      
      db.query(insertSampleUser, (err, result) => {
        if (err) {
          console.error('Error inserting sample user:', err);
          db.end();
          return;
        }
        console.log('Sample user created successfully');
        console.log('Database initialization complete!');
        db.end();
      });
    } else {
      console.log('Sample user already exists');
      console.log('Database initialization complete!');
      db.end();
    }
  });
}