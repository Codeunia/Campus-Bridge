# Shakthi Bot - Campus Bridge AI Assistant

Shakthi Bot is an intelligent chatbot assistant that helps users navigate the Campus Bridge Learning Management System. Named after the Sanskrit word for "power" or "strength," Shakthi Bot empowers students to easily find what they need within the platform.

## Features

- **Context-Aware Responses**: Provides relevant help based on the current page
- **Website Navigation Guidance**: Assists users in finding courses, lectures, assignments, and other resources
- **Login and Registration Help**: Guides users through account creation and login processes
- **Course Information**: Provides details about available courses and how to access them
- **Support Information**: Offers contact details for technical support
- **Consistent Experience**: Available on all pages of the application

## Implementation

### Files

1. **`public/shakti-bot.js`** - Centralized JavaScript implementation
2. **HTML Files** - All pages include the chatbot elements and script reference

### How It Works

1. **Page Context Detection**: The bot detects which page the user is on to provide contextually relevant responses
2. **Natural Language Processing**: Users can ask questions in plain English
3. **Predefined Responses**: The bot has a comprehensive set of responses for common questions
4. **Dynamic UI**: Chat widget appears as a floating button that can be opened/closed

### Pages with Shakthi Bot

Shakthi Bot is now available on all pages of the Campus Bridge application, including but not limited to:
- Homepage (`index.html`)
- Login Page (`studentlogin.html`)
- Registration Page (`register.html`)
- Forgot Password Page (`forgot-password.html`)
- Courses Dashboard (`courses.html`)
- Free Courses Page (`freecourses.html`)
- Main Dashboard (`dashboard.html`)
- Placement Panel (`placement.html`)
- Assignments (`assignments.html`)
- Lectures (`lectures.html`)
- Attendance (`attendance.html`)
- Exams (`exams.html`)
- Timetable (`timetable.html`)
- Reports (`reports.html`)
- Profile (`profile.html`)
- Logout (`logout.html`)
- Assignment Details (`assignment-details.html`, `assignment-details2.html`)
- AI Assistant (`aiassistant.html`)
- Coding Tracks (`codingtracks.html`)
- DSA (`dsa.html`)
- Web Development (`webdevelop.html`)
- Python (`python.html`)
- Java (`java.html`)
- Course List (`devcourse.html`)
- Main Board (`mainboard.html`)

## Usage

Users can interact with Shakthi Bot by:

1. Clicking the circular icon in the bottom-right corner of the screen
2. Typing questions in natural language
3. Receiving immediate, helpful responses

### Sample Questions

- "How do I access courses?"
- "Where can I find free courses?"
- "How do I log in to my account?"
- "Where is the placement panel?"
- "How can I contact support?"
- "What courses are available?"
- "How do I watch course videos?"

## Customization

To modify Shakthi Bot responses:

1. Edit `public/shakti-bot.js`
2. Modify the response functions:
   - `getCoursesResponse()` - For courses page responses
   - `getLoginResponse()` - For login page responses
   - `getFreeCoursesResponse()` - For free courses page responses
   - `getGeneralResponse()` - For general responses

## Technical Details

### Class Structure

The bot is implemented as a JavaScript class with the following methods:

- `initialize()` - Sets up the chatbot UI and event listeners
- `createChatElements()` - Dynamically creates chatbot HTML elements
- `addEventListeners()` - Attaches click and keyboard events
- `appendMessage()` - Adds messages to the chat log
- `showWelcome()` - Displays context-aware welcome message
- `getResponse()` - Processes user input and returns appropriate response
- Context-specific response methods for different pages

### Context Detection

The bot determines the current page by examining the URL path:
- `/courses` - Courses context
- `/login` - Login context
- `/free` - Free courses context
- `/register` - Registration context
- `/placement` - Placement context
- Default - General context

## Future Enhancements

Potential improvements for Shakthi Bot:

1. **Integration with Backend**: Connect to Campus Bridge APIs for real-time data
2. **Machine Learning**: Implement more sophisticated NLP for better understanding
3. **Voice Support**: Add voice input/output capabilities
4. **Multilingual Support**: Offer assistance in multiple languages
5. **Personalization**: Customize responses based on user history and preferences

## Troubleshooting

If Shakthi Bot doesn't appear:

1. Ensure `shakti-bot.js` is properly loaded
2. Check browser console for JavaScript errors
3. Verify that the HTML includes the chatbot elements and script reference

If responses seem incorrect:

1. Check the context detection logic in `shakti-bot.js`
2. Verify that the appropriate response function is being called
3. Ensure the response text is accurate and helpful