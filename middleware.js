// Middleware for Campus Bridge application

// Simple in-memory session store (in production, use a proper session store like Redis)
const sessions = new Map();

// Generate a random session ID
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Middleware to check if user is authenticated
function requireAuth(req, res, next) {
  const sessionId = req.headers['x-session-id'] || req.query.sessionId;
  
  if (!sessionId) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }
  
  const session = sessions.get(sessionId);
  if (!session) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid session' 
    });
  }
  
  // Attach user info to request
  req.user = session.user;
  next();
}

// Create a new session for a user
function createSession(user) {
  const sessionId = generateSessionId();
  const session = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    createdAt: new Date()
  };
  
  sessions.set(sessionId, session);
  return sessionId;
}

// Destroy a session
function destroySession(sessionId) {
  sessions.delete(sessionId);
}

// Get user info from session
function getUserFromSession(sessionId) {
  const session = sessions.get(sessionId);
  return session ? session.user : null;
}

module.exports = {
  requireAuth,
  createSession,
  destroySession,
  getUserFromSession
};