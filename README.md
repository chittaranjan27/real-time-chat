                                                 # Chat Application

## 🚀 Overview
This is a real-time chat application built using the **MERN** stack along with **Socket.io** for real-time messaging. The app features authentication, online user status, global state management, and robust error handling.

## 🌟 Tech Stack
- **Frontend:** React, TailwindCSS, Daisy UI, Zustand
- **Backend:** Node.js, Express.js, MongoDB
- **Real-time Communication:** Socket.io
- **Authentication & Authorization:** JWT (JSON Web Tokens)
- **Deployment:** Free hosting solutions

## 🎯 Features
- 🔐 **Authentication & Authorization** using JWT
- 👾 **Real-time Messaging** powered by Socket.io
- 🎭 **Online User Status** indicator
- 🌎 **Global State Management** using Zustand
- 🛠️ **Error Handling** on both client and server
- 📱 **Fully Responsive UI** with TailwindCSS and Daisy UI
- 🎯 **Optimized Performance** for seamless chat experience
- 🚀 **Deployment-ready** setup for free hosting

## 📌 Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
   ```
2. **Install dependencies:**
   ```sh
   # Backend setup
   cd server
   npm install
   ```
   ```sh
   # Frontend setup
   cd ../client
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the `server` directory and add:
     ```env
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```
4. **Run the application:**
   ```sh
   # Start the backend
   cd server
   npm run dev
   ```
   ```sh
   # Start the frontend
   cd ../client
   npm run dev
   ```


