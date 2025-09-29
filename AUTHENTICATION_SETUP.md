# Authentication System Setup for Campus Bridge

This document explains how to set up and use the authentication system for Campus Bridge.

## Overview

The authentication system includes:
- User registration and login
- Session management
- Protected routes
- Database storage for user credentials

## Setup Instructions

### 1. Initialize the Database

Since Node.js is not available on this system, you'll need to manually create the database tables.

Open MySQL Workbench or Terminal and run:

```sql
CREATE DATABASE lms;

USE lms;

CREATE TABLE learning_resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a test user
INSERT INTO users (name, email, password) VALUES ('Test User', 'test@example.com', 'password123');
```

If Node.js becomes available later, you can use the initialization script:

```bash
npm run init-db
```

### 2. Start the Server

```bash
npm start
```

Or for development:

```bash
npm run dev
```

## API Endpoints

### User Registration
- **Endpoint**: `POST /api/register`
- **Body**: 
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "User registered successfully"
  }
  ```

### User Login
- **Endpoint**: `POST /api/login`
- **Body**: 
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Login successful",
    "sessionId": "session_identifier",
    "user": {
      "id": 1,
      "name": "User Name",
      "email": "user@example.com"
    }
  }
  ```

### User Logout
- **Endpoint**: `POST /api/logout`
- **Body**: 
  ```json
  {
    "sessionId": "session_identifier"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

### Check Authentication
- **Endpoint**: `GET /api/auth/check`
- **Headers**: 
  ```
  X-Session-Id: session_identifier
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "User is authenticated",
    "user": {
      "id": 1,
      "name": "User Name",
      "email": "user@example.com"
    }
  }
  ```

## How It Works

### Frontend

1. **Login Process**:
   - User submits credentials via the login form
   - Credentials are sent to the backend `/api/login` endpoint
   - If successful, the session ID is stored in `localStorage`
   - User is redirected to the courses page

2. **Session Management**:
   - Session ID is stored in `localStorage` as `sessionId`
   - On page load, protected pages check authentication status
   - Session ID is sent in the `X-Session-Id` header for authenticated requests

3. **Protected Routes**:
   - Pages like `courses.html` check for a valid session on load
   - Unauthorized users are shown an access denied message

### Backend

1. **Session Storage**:
   - Sessions are stored in memory using a `Map` data structure
   - Each session contains user information and creation timestamp
   - Sessions can be destroyed on logout

2. **Authentication Middleware**:
   - `requireAuth` middleware checks for valid sessions
   - Used to protect API endpoints that require authentication

## Security Considerations

### Current Implementation
- Passwords are stored in plain text (NOT secure for production)
- Sessions are stored in memory (will be lost on server restart)
- No password strength validation

### Recommended Improvements for Production
1. Hash passwords using bcrypt:
   ```javascript
   const bcrypt = require('bcrypt');
   // Hash password before storing
   const hashedPassword = await bcrypt.hash(password, 10);
   // Compare hashed password during login
   const isValid = await bcrypt.compare(password, hashedPassword);
   ```

2. Use a proper session store like Redis:
   ```javascript
   const session = require('express-session');
   const RedisStore = require('connect-redis')(session);
   ```

3. Add CSRF protection
4. Implement rate limiting for login attempts
5. Add input validation and sanitization
6. Use HTTPS in production
7. Implement password strength requirements

## Testing

### Default Test User
The database initialization script creates a test user:
- **Email**: test@example.com
- **Password**: password123

### Testing Authentication
1. Navigate to `http://localhost:8080/studentlogin.html`
2. Enter the test credentials
3. You should be redirected to the courses page
4. Try accessing `http://localhost:8080/courses.html` directly (should work if logged in)
5. Try logging out and accessing protected pages (should show access denied)

## Troubleshooting

### Common Issues

1. **Cannot log in with test credentials**:
   - Ensure you've run `npm run init-db`
   - Check the database connection in `db.js`
   - Verify the users table was created

2. **Access denied to protected pages**:
   - Make sure you're logged in
   - Check browser console for errors
   - Verify session ID is being stored in localStorage

3. **Database connection errors**:
   - Check database credentials in `db.js`
   - Ensure MySQL server is running
   - Verify the database exists

### Debugging Tips

1. Check browser developer tools Network tab to see API requests
2. Check server console for error messages
3. Use database client to verify data in tables
4. Check localStorage for session ID after login

## Support

For questions about this implementation, contact the Campus Bridge development team.