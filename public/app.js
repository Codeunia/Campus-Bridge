// App.js - Main application JavaScript file
console.log('Campus Bridge App Loaded');

// Function to check if user is authenticated
function checkAuth() {
  const sessionId = localStorage.getItem('sessionId');
  return !!sessionId;
}

// Function to redirect to login if not authenticated
function requireAuth() {
  if (!checkAuth()) {
    window.location.href = '/studentlogin.html';
  }
}

// Function to logout user
function logout() {
  const sessionId = localStorage.getItem('sessionId');
  
  if (sessionId) {
    // Notify backend about logout (if backend is available)
    fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sessionId: sessionId })
    }).catch(error => {
      // Silently handle errors when backend is not available
      console.warn('Backend not available for logout:', error);
    });
    
    // Clear session from localStorage
    localStorage.removeItem('sessionId');
  }
  
  // Redirect to login page
  window.location.href = '/studentlogin.html';
}

// Global error handling
window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
});

// Global unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});

// Check if we're running on a hosting platform and show a warning if needed
document.addEventListener('DOMContentLoaded', function() {
  // This is a placeholder for any future hosting-specific warnings
  // Currently, we assume Render deployment will work properly with backend services
});