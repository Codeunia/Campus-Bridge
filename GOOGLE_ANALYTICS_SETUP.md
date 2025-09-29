# Google Analytics Implementation for Campus Bridge

This document explains how Google Analytics has been implemented in the Campus Bridge Learning Management System.

## Implementation Overview

We've implemented Google Analytics 4 (GA4) tracking across the Campus Bridge application to track user interactions, page views, and other important events. The implementation uses a centralized approach with a shared JavaScript file.

## Files Modified

1. `public/analytics.js` - Centralized analytics tracking script
2. `public/index.html` - Main landing page
3. `public/studentlogin.html` - Student login page
4. `public/courses.html` - Courses dashboard
5. `public/freecourses.html` - Free courses page

## Setup Instructions

### 1. Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Admin" (gear icon) in the lower left
4. In the "Account" column, select an existing account or create a new one
5. In the "Property" column, click "Create Property"
6. Select "Web" as the platform
7. Enter "Campus Bridge" as the property name
8. Enter your website URL
9. Select the appropriate reporting time zone
10. Click "Next" and complete the setup

### 2. Get Your Measurement ID

1. After creating the property, you'll get a Measurement ID (starts with "G-")
2. If you need to find it later:
   - Go to "Admin"
   - Select your property
   - Click "Data Streams"
   - Click your web stream
   - Your Measurement ID is displayed at the top

### 3. Update the Measurement ID

1. Open `public/analytics.js`
2. Find the line: `gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-YOUR-GA4-ID-HERE';`
3. Replace `G-YOUR-GA4-ID-HERE` with your actual Measurement ID
4. Also update the line: `gtag('config', 'G-YOUR-GA4-ID-HERE');`

### 4. Verify Implementation

1. Deploy your application
2. Visit your site
3. Go to your Google Analytics Realtime reports
4. You should see active users

## Tracked Events

The implementation tracks the following events:

### Page Views
- Automatic tracking of all page views

### Navigation Events
- Clicks on main navigation elements
- Course card selections
- Sidebar navigation

### Authentication Events
- Login attempts
- Successful logins

### Course Interaction Events
- Course card clicks
- Video views in free courses

### Chatbot Events
- Opening the Shakti AI chatbot
- Interactions with the chatbot

## Custom Functions

The `analytics.js` file provides several helper functions:

- `trackPageView(pageName)` - Track page views
- `trackNavigation(destination)` - Track navigation events
- `trackCourseInteraction(courseName, action)` - Track course interactions
- `trackAuthEvent(eventType, description)` - Track authentication events
- `trackChatbotEvent(eventType, message)` - Track chatbot interactions
- `trackVideoView(courseName, videoTitle)` - Track video views

## Adding Tracking to New Pages

To add Google Analytics tracking to new pages:

1. Include the analytics script in the `<head>` section:
   ```html
   <script src="analytics.js"></script>
   ```

2. Use the appropriate tracking functions for events:
   ```javascript
   // For navigation
   trackNavigation('Page Name');
   
   // For course interactions
   trackCourseInteraction('Course Name', 'Action');
   
   // For authentication
   trackAuthEvent('event_type', 'Description');
   ```

## Privacy Considerations

This implementation respects user privacy by:
- Not collecting personally identifiable information (PII)
- Only tracking interactions and page views
- Using standard GA4 anonymization features

## Troubleshooting

If you're not seeing data in Google Analytics:

1. Check that you've updated the Measurement ID correctly
2. Verify there are no JavaScript errors in the browser console
3. Ensure your site is accessible via HTTPS (required for GA4)
4. Check that your ad blocker isn't blocking GA scripts
5. Confirm you're looking at the correct date range in GA reports

## Support

For questions about this implementation, contact the Campus Bridge development team.