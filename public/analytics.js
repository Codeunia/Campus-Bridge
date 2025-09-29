// Google Analytics 4 tracking script for Campus Bridge
// This script should be included in all pages that need GA tracking

// Initialize Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Load GA4 script dynamically if not already loaded
if (typeof gtag !== 'undefined' && !document.getElementById('ga-script')) {
  const gaScript = document.createElement('script');
  gaScript.id = 'ga-script';
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-YOUR-GA4-ID-HERE';
  document.head.appendChild(gaScript);
  
  gtag('js', new Date());
  gtag('config', 'G-YOUR-GA4-ID-HERE');
}

// Function to track page views
function trackPageView(pageName) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      'event_category': 'Page',
      'event_label': pageName + ' Page Viewed'
    });
  }
}

// Function to track navigation events
function trackNavigation(destination) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'navigation', {
      'event_category': 'Navigation',
      'event_label': destination + ' Navigated'
    });
  }
}

// Function to track course interactions
function trackCourseInteraction(courseName, action) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'course_interaction', {
      'event_category': 'Course',
      'event_label': courseName + ' ' + action
    });
  }
}

// Function to track authentication events
function trackAuthEvent(eventType, description) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventType, {
      'event_category': 'Authentication',
      'event_label': description
    });
  }
}

// Function to track chatbot interactions
function trackChatbotEvent(eventType, message) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventType, {
      'event_category': 'Chatbot',
      'event_label': 'Shakti AI',
      'custom_parameter': message
    });
  }
}

// Function to track video views
function trackVideoView(courseName, videoTitle) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'video_view', {
      'event_category': 'Content',
      'event_label': courseName + ' - ' + videoTitle
    });
  }
}

// Auto-track page views when the script loads
document.addEventListener('DOMContentLoaded', function() {
  const pageName = document.title.replace(' | Campus Bridge', '').replace(' – Campus Bridge', '');
  trackPageView(pageName);
});