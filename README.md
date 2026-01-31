# ChatNova - AI-Powered Chat Assistant 🤖

A fully functional ChatGPT clone built with modern web technologies, featuring real-time AI conversations, web search capabilities, and a sleek, responsive user interface.

![ChatNova Banner](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Live Demo

Access the application at: `http://localhost:3001`

## ✨ Key Features

- **🤖 AI-Powered Conversations** - Leverages Groq's LLaMA 3.3 70B model for intelligent responses
- **🔍 Real-Time Web Search** - Integrated Tavily API for up-to-date information retrieval
- **💬 Context-Aware Chat** - Maintains conversation history with thread-based memory
- **🎨 Modern UI/UX** - ChatGPT-inspired interface with smooth animations
- **📱 Responsive Design** - Optimized for all screen sizes
- **⌨️ Smart Input** - Auto-resizing textarea with keyboard shortcuts (Enter to send, Shift+Enter for new line)
- **🔄 Auto-Scroll** - Smooth scrolling to latest messages
- **💾 Conversation Threading** - Separate conversation threads with "New Chat" functionality
- **🎯 Example Prompts** - Quick-start suggestions for user engagement
- **⚡ Fast & Efficient** - Caching mechanism for improved performance
- **🛡️ Error Handling** - Robust error management with user-friendly messages

## 🛠️ Technical Stack

### Frontend

- **HTML5** - Semantic markup
- **CSS3 / Tailwind CSS** - Utility-first styling with custom animations
- **Vanilla JavaScript** - Pure JS with modern ES6+ features
- **Font Awesome** - Icon library for UI elements

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **ES Modules** - Modern JavaScript module system

### AI & APIs

- **Groq SDK** - LLaMA 3.3 70B language model integration
- **Tavily API** - Real-time web search capabilities

### Additional Technologies

- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing
- **node-cache** - In-memory caching for conversation threads

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Groq API Key ([Get it here](https://console.groq.com))
- Tavily API Key ([Get it here](https://tavily.com))

## 🔧 Installation & Setup

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd chatgpt-clone
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
DEBUG=false
```

4. **Build Tailwind CSS**

```bash
npm run build:css
```

5. **Start the server**

```bash
node server.js
```

6. **Access the application**

```
http://localhost:3001
```

## 📁 Project Structure

```
chatgpt-clone/
├── frontend/
│   ├── index.html          # Main HTML file with modern UI
│   ├── script.js           # Client-side JavaScript logic
│   ├── input.css           # Tailwind CSS input
│   └── output.css          # Compiled CSS
├── server.js               # Express server with static file serving
├── chatbot.js              # AI logic with tool calling & caching
├── app.js                  # Additional app configuration
├── .env                    # Environment variables (not in repo)
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies
├── tailwind.config.js      # Tailwind configuration
└── README.md               # Project documentation
```

## 🎯 Key Skills Demonstrated

### Full-Stack Development

- ✅ RESTful API design and implementation
- ✅ Client-server architecture
- ✅ Asynchronous JavaScript (async/await, Promises)
- ✅ Error handling and validation

### Frontend Development

- ✅ Responsive UI/UX design
- ✅ DOM manipulation and event handling
- ✅ Modern CSS with Tailwind utility classes
- ✅ Smooth animations and transitions
- ✅ Accessibility considerations

### Backend Development

- ✅ Express.js server configuration
- ✅ Static file serving
- ✅ API endpoint creation
- ✅ Environment variable management
- ✅ CORS handling

### AI Integration

- ✅ LLM API integration (Groq)
- ✅ Function calling / Tool use
- ✅ Context management and memory
- ✅ Web search integration
- ✅ Prompt engineering

### Software Engineering Best Practices

- ✅ Clean, modular code structure
- ✅ Error handling and logging
- ✅ Environment configuration
- ✅ Version control (Git)
- ✅ Documentation

## 🔄 API Endpoints

### `POST /chat`

Send a message and receive AI response

**Request Body:**

```json
{
  "message": "Your question here",
  "threadId": "unique-thread-id"
}
```

**Response:**

```json
{
  "message": "AI assistant's response"
}
```

## 🎨 Features in Detail

### Intelligent Context Management

The chatbot maintains conversation history using a caching system, allowing for context-aware responses across multiple interactions within the same thread.

### Smart Tool Usage

The AI automatically determines when to use its built-in knowledge versus when to search the web for real-time information, providing accurate and up-to-date responses.

### User Experience

- Welcome screen with example prompts
- Loading indicators with animated dots
- Gradient color scheme for visual appeal
- Smooth scrolling to latest messages
- Keyboard shortcuts for efficiency

## 🚀 Future Enhancements

- [ ] User authentication and chat history persistence
- [ ] Multiple AI model support
- [ ] Voice input/output
- [ ] Code syntax highlighting in responses
- [ ] Export chat conversations
- [ ] Dark/Light theme toggle
- [ ] Message editing and regeneration
- [ ] File upload support

## 📝 Scripts

```bash
npm run build:css      # Build Tailwind CSS
npm run watch:css      # Watch and rebuild CSS on changes
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

**Your Name** - [Your Email] - [Your LinkedIn]

Project Link: [https://github.com/yourusername/chatgpt-clone](https://github.com/yourusername/chatgpt-clone)

## 📄 License

This project is for educational and portfolio purposes.

---

⭐ **If you found this project helpful, please consider giving it a star!** ⭐

## 🙏 Acknowledgments

- [Groq](https://groq.com) for the LLM API
- [Tavily](https://tavily.com) for web search capabilities
- [OpenAI](https://openai.com) for the ChatGPT interface inspiration
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework

---

_Built with ❤️ by [Your Name]_
