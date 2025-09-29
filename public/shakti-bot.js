// Shakthi Bot - Campus Bridge AI Assistant
// This script provides intelligent guidance for navigating the Campus Bridge website

class ShakthiBot {
  constructor() {
    this.name = "Shakthi Bot";
    this.pageContext = this.getPageContext();
  }

  getPageContext() {
    const path = window.location.pathname;
    if (path.includes('courses')) return 'courses';
    if (path.includes('login')) return 'login';
    if (path.includes('free')) return 'free-courses';
    if (path.includes('register')) return 'register';
    if (path.includes('placement')) return 'placement';
    return 'home';
  }

  initialize() {
    // Create chatbot elements if they don't exist
    if (!document.getElementById('shakti-toggle')) {
      this.createChatElements();
    }
    
    // Add event listeners
    this.addEventListeners();
  }

  createChatElements() {
    // Create toggle button
    const toggleButton = document.createElement('div');
    toggleButton.id = 'shakti-toggle';
    toggleButton.innerHTML = `
      <img src="https://res.cloudinary.com/dwouk4lee/image/upload/v1744485469/download_iigdmt.jpg" 
           alt="Shakthi Bot" 
           style="width: 60px; height: 60px; border-radius: 50%; cursor: pointer;">
    `;
    toggleButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1000;';
    document.body.appendChild(toggleButton);

    // Create chat widget
    const chatWidget = document.createElement('div');
    chatWidget.id = 'shakti-chat';
    chatWidget.innerHTML = `
      <div id="shakti-header" style="background: #4e54c8; color: white; padding: 15px; border-radius: 10px 10px 0 0; font-weight: bold;">💬 Shakthi Bot</div>
      <div id="chat-log" style="flex: 1; padding: 15px; overflow-y: auto; font-size: 14px;"></div>
      <input type="text" id="user-input" placeholder="Ask me about Campus Bridge..." style="padding: 12px; border: 1px solid #ddd; border-radius: 0 0 10px 10px;">
    `;
    chatWidget.style.cssText = 'position: fixed; bottom: 100px; right: 20px; width: 350px; height: 400px; background: white; border-radius: 10px; box-shadow: 0 0 15px rgba(0,0,0,0.2); display: none; flex-direction: column; z-index: 1001;';
    document.body.appendChild(chatWidget);
  }

  addEventListeners() {
    const chatBox = document.getElementById("shakti-chat");
    const toggleButton = document.getElementById("shakti-toggle");
    const chatLog = document.getElementById("chat-log");
    const inputBox = document.getElementById("user-input");

    if (!chatBox || !toggleButton || !chatLog || !inputBox) return;

    toggleButton.addEventListener("click", () => {
      if (chatBox.style.display === "none") {
        chatBox.style.display = "flex";
        chatLog.innerHTML = "";
        this.showWelcome();
      } else {
        chatBox.style.display = "none";
      }
    });

    inputBox.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const userInput = inputBox.value.trim();
        if (!userInput) return;

        this.appendMessage("You", userInput);
        const reply = this.getResponse(userInput);
        this.appendMessage("Shakthi Bot", reply);
        inputBox.value = "";

        if (userInput === "7") {
          chatBox.style.display = "none";
        }
      }
    });
  }

  appendMessage(sender, message) {
    const chatLog = document.getElementById("chat-log");
    if (!chatLog) return;

    const messageElem = document.createElement("div");
    messageElem.style.marginBottom = "10px";
    messageElem.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatLog.appendChild(messageElem);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  showWelcome() {
    let welcomeMessage;
    
    switch (this.pageContext) {
      case 'courses':
        welcomeMessage = `🌸 Hello! I'm Shakthi Bot, your Campus Bridge assistant. How can I help you with your courses today?<br><br>
          You can ask me questions like:<br>
          • "How do I access course materials?"<br>
          • "Where can I find assignments?"<br>
          • "How do I navigate the sidebar?"<br><br>
          Or type <strong>help</strong> for more options.`;
        break;
        
      case 'login':
        welcomeMessage = `🌸 Hello! I'm Shakthi Bot, your Campus Bridge assistant. Need help logging in?<br><br>
          You can ask me questions like:<br>
          • "How do I log in?"<br>
          • "How do I register?"<br>
          • "What is Campus Bridge?"<br><br>
          Or type <strong>help</strong> for more options.`;
        break;
        
      case 'free-courses':
        welcomeMessage = `🌸 Hello! I'm Shakthi Bot, your Campus Bridge assistant. How can I help you with our free courses?<br><br>
          You can ask me questions like:<br>
          • "What courses are available?"<br>
          • "How do I watch videos?"<br>
          • "How do I go back to dashboard?"<br><br>
          Or type <strong>help</strong> for more options.`;
        break;
        
      default:
        welcomeMessage = `🌸 Hello! I'm Shakthi Bot, your Campus Bridge assistant. How can I help you today?<br><br>
          You can ask me questions like:<br>
          • "How do I access courses?"<br>
          • "Where can I find free courses?"<br>
          • "How do I log in?"<br><br>
          Or type <strong>help</strong> for more options.`;
    }
    
    this.appendMessage("Shakthi Bot", welcomeMessage);
  }

  getResponse(input) {
    const lowerInput = input.toLowerCase().trim();
    
    // Context-aware responses
    switch (this.pageContext) {
      case 'courses':
        return this.getCoursesResponse(lowerInput, input);
      case 'login':
        return this.getLoginResponse(lowerInput, input);
      case 'free-courses':
        return this.getFreeCoursesResponse(lowerInput, input);
      default:
        return this.getGeneralResponse(lowerInput, input);
    }
  }

  getCoursesResponse(lowerInput, input) {
    if (lowerInput.includes("course") && lowerInput.includes("access")) {
      return "You're already on the Courses page! Click on any course card to view its details.";
    }
    
    if (lowerInput.includes("free") && lowerInput.includes("course")) {
      return "You can find free courses by clicking on the 'Free Courses' link in the sidebar navigation.";
    }
    
    if (lowerInput.includes("sidebar")) {
      return "The sidebar on the left contains all your navigation options:<br>• Courses (current page)<br>• Lectures<br>• Assignments<br>• Attendance<br>• Exams<br>• Timetable<br>• Reports<br>• Logout";
    }
    
    if (lowerInput.includes("lecture")) {
      return "To access lectures:<br>1. Click on 'Lectures' in the sidebar<br>2. Browse or search for the lecture you need";
    }
    
    if (lowerInput.includes("assignment")) {
      return "To view assignments:<br>1. Click on 'Assignments' in the sidebar<br>2. You'll see all your current assignments";
    }
    
    return this.getGeneralResponse(lowerInput, input);
  }

  getLoginResponse(lowerInput, input) {
    if ((lowerInput.includes("log") || lowerInput.includes("sign")) && lowerInput.includes("in")) {
      return "To log in:<br>1. Enter your email address in the first field<br>2. Enter your password in the second field<br>3. Click the 'Login' button<br><br>If you don't have an account yet, click 'Register' below the login form.";
    }
    
    if (lowerInput.includes("register") || lowerInput.includes("sign up")) {
      return "To register for a new account:<br>1. Click the 'Register' link below the login form<br>2. Fill in your name, email, and password<br>3. Confirm your password<br>4. Click 'Register'<br><br>After registration, you can log in with your new credentials.";
    }
    
    if (lowerInput.includes("forgot") || lowerInput.includes("reset") || lowerInput.includes("password")) {
      return "To reset your password:<br>1. Click the 'Forgot Password?' link below the login form<br>2. Enter your email address<br>3. Follow the instructions sent to your email";
    }
    
    return this.getGeneralResponse(lowerInput, input);
  }

  getFreeCoursesResponse(lowerInput, input) {
    if (lowerInput.includes("access") && lowerInput.includes("free")) {
      return "You're already on the Free Courses page! Click on any course card (DSA, C++, Python, or HTML & CSS) to view its videos.";
    }
    
    if (lowerInput.includes("course") && lowerInput.includes("available")) {
      return "We offer these free courses:<br>• DSA (Data Structures & Algorithms)<br>• C++<br>• Python<br>• HTML & CSS<br><br>Click on any course card to view its content.";
    }
    
    if (lowerInput.includes("watch") && (lowerInput.includes("video") || lowerInput.includes("course"))) {
      return "To watch course videos:<br>1. Click on a course card (DSA, C++, Python, or HTML & CSS)<br>2. The videos for that course will appear below<br>3. Click 'Play' on any video to start watching";
    }
    
    return this.getGeneralResponse(lowerInput, input);
  }

  getGeneralResponse(lowerInput, input) {
    // Navigation and website guidance
    if (lowerInput.includes("course") && lowerInput.includes("access")) {
      return "To access your courses:<br>1. Log in to your account<br>2. Click on 'Courses' in the dashboard<br>3. Select any course to view its content";
    }
    
    if (lowerInput.includes("free") && lowerInput.includes("course")) {
      return "You can find free courses by clicking on the 'Free Courses' card on the homepage. This will take you to a page with various skill development courses.";
    }
    
    if (lowerInput.includes("log") || lowerInput.includes("login")) {
      return "To log in:<br>1. Click the 'Explore as a Student' button on the homepage<br>2. Enter your email and password<br>3. Click 'Login'<br><br>If you don't have an account, click 'Register' on the login page.";
    }
    
    if (lowerInput.includes("placement")) {
      return "The Placement Panel can be accessed by clicking on the 'Placement Panel' card on the homepage. It contains resources to help with your job search and career development.";
    }
    
    if (lowerInput.includes("contact") || lowerInput.includes("support")) {
      return "You can contact our support team by:<br>• Email: connect@campusbridge.io<br>• Phone: +91 98765 43210<br>• Using the contact form at the bottom of the homepage";
    }
    
    if (lowerInput.includes("dashboard")) {
      return "After logging in, you'll be taken to your dashboard. From there, you can access all your courses, lectures, assignments, and other academic resources.";
    }
    
    if (lowerInput.includes("lecture")) {
      return "To access lectures:<br>1. Log in to your account<br>2. Go to your dashboard<br>3. Click on 'Lectures' in the sidebar<br>4. Browse or search for the lecture you need";
    }
    
    if (lowerInput.includes("assignment")) {
      return "To view assignments:<br>1. Log in to your account<br>2. Go to your dashboard<br>3. Click on 'Assignments' in the sidebar<br>4. You'll see all your current assignments";
    }
    
    if (lowerInput.includes("register") || lowerInput.includes("sign up")) {
      return "To register for an account:<br>1. Click the 'Explore as a Student' button on the homepage<br>2. On the login page, click 'Register'<br>3. Fill in your details and submit the form";
    }
    
    // Help command
    if (lowerInput === "help") {
      return `I can help you navigate Campus Bridge! Try asking me about:<br>
        • Courses and lectures<br>
        • Free courses<br>
        • Login and registration<br>
        • Placement resources<br>
        • Contact information<br>
        • Dashboard navigation<br><br>
        Just describe what you're looking for, and I'll guide you!`;
    }
    
    // Default responses
    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return "Hello there! I'm Shakthi Bot. How can I assist you with navigating Campus Bridge today?";
    }
    
    if (lowerInput.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    if (lowerInput === "bye" || lowerInput === "goodbye") {
      return "Goodbye! Feel free to chat with me anytime you need help. 👋";
    }
    
    // Original numbered options
    switch (input) {
      case "1": return "It is Riya Jain";
      case "2": return "Sure, mail to campusbridge@yahoo.com";
      case "3": return "You can pay your fee at University Office";
      case "4": return "Campus Bridge is a platform for students to learn, compete, and grow.";
      case "5": return "Hello there! How can I assist you today?";
      case "6": return "I was created by the Campus Bridge team.";
      case "7": return "Goodbye! 👋";
      default: return `I'm here to help you navigate Campus Bridge! Try asking me questions like:<br>
        • "How do I access courses?"<br>
        • "Where can I find free courses?"<br>
        • "How do I log in?"<br><br>
        Or type <strong>help</strong> for more options.`;
    }
  }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', function() {
  const shaktiBot = new ShakthiBot();
  shaktiBot.initialize();
});