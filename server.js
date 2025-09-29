const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const { createSession, destroySession, getUserFromSession } = require('./middleware');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Function to send email confirmation
function sendEmailConfirmation(user) {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Campus Bridge - Login Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50;">Login Successful!</h2>
        <p>Hello ${user.name},</p>
        <p>We're confirming that you've successfully logged into Campus Bridge LMS at ${new Date().toLocaleString()}.</p>
        <p>If this wasn't you, please contact our support team immediately.</p>
        <br>
        <p>Best regards,<br>Campus Bridge Team</p>
      </div>
    `
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Function to send email verification
function sendEmailVerification(user, token) {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Define email options
  const verificationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/api/verify-email?token=${token}&email=${user.email}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Campus Bridge - Email Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50;">Welcome to Campus Bridge!</h2>
        <p>Hello ${user.name},</p>
        <p>Thank you for registering with Campus Bridge LMS. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email Address</a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
        <p>If you didn't create an account with us, please ignore this email.</p>
        <br>
        <p>Best regards,<br>Campus Bridge Team</p>
      </div>
    `
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending verification email:', error);
    } else {
      console.log('Verification email sent: ' + info.response);
    }
  });
}

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded PDFs
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// API route for PDFs
app.get('/api/resources/pdfs', (req, res) => {
  const pdfs = [
    { title: "Lecture 1 - Data Structures", pdf_url: "/uploads/DSA.pdf" },
    { title: "Lecture 2 - Operating Systems", pdf_url: "/uploads/OS.pdf" },
    { title: "Lecture 3 - Database Management Systems", pdf_url: "/uploads/DBMS.pdf" },
    { title: "Lecture 4 - Computer Networks", pdf_url: "/uploads/CN.pdf" }
  ];
  res.json(pdfs);
});

// Email verification endpoint
app.get('/api/verify-email', (req, res) => {
  const { token, email } = req.query;
  
  // Simple validation
  if (!token || !email) {
    return res.status(400).send('Invalid verification link');
  }
  
  // In a real application, you would verify the token against a database
  // For this implementation, we'll just update the user as verified
  const query = 'UPDATE users SET is_verified = 1 WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal server error');
    }
    
    if (result.affectedRows > 0) {
      // Redirect to login page with success message
      res.redirect('/studentlogin.html?verified=true');
    } else {
      res.status(400).send('Invalid verification link');
    }
  });
});

// User authentication endpoints
// User login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }
  
  // Query the database for the user
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
    
    if (results.length > 0) {
      const user = results[0];
      
      // Check if user is verified
      if (!user.is_verified) {
        return res.status(401).json({ 
          success: false, 
          message: 'Please verify your email address before logging in' 
        });
      }
      
      // User found, authentication successful
      // Create a session for the user
      const sessionId = createSession(user);
      
      // Send email confirmation
      sendEmailConfirmation(user);
      
      return res.json({ 
        success: true, 
        message: 'Login successful',
        sessionId: sessionId,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } else {
      // User not found or invalid credentials
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }
  });
});

// User registration endpoint
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  
  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name, email, and password are required' 
    });
  }
  
  // Check if user already exists
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
    
    if (results.length > 0) {
      // User already exists
      return res.status(409).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }
    
    // Insert new user
    // Note: In a real application, you should hash the password
    const insertQuery = 'INSERT INTO users (name, email, password, is_verified) VALUES (?, ?, ?, 0)';
    db.query(insertQuery, [name, email, password], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Internal server error' 
        });
      }
      
      // Get the inserted user
      const user = { id: result.insertId, name, email };
      
      // Generate a simple token (in a real app, use a proper token library)
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      // Send verification email
      sendEmailVerification(user, token);
      
      return res.status(201).json({ 
        success: true, 
        message: 'User registered successfully. Please check your email for verification.' 
      });
    });
  });
});

// User logout endpoint
app.post('/api/logout', (req, res) => {
  const { sessionId } = req.body;
  
  if (sessionId) {
    destroySession(sessionId);
  }
  
  return res.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
});

// Check if user is authenticated
app.get('/api/auth/check', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  
  if (!sessionId) {
    return res.status(401).json({ 
      success: false, 
      message: 'No session provided' 
    });
  }
  
  const user = getUserFromSession(sessionId);
  if (!user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid session' 
    });
  }
  
  return res.json({ 
    success: true, 
    message: 'User is authenticated',
    user: user
  });
});

// Catch-all for SPA/frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server - Use Render's PORT or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});