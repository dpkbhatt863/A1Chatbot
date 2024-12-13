# AI Chatbot Web Application

This repository contains a web application that provides a chatbot interface with user authentication and AI-powered responses. The application is built using React for the frontend and Node.js with Express for the backend.

## Features

- **AI-Powered Chatbot**: Utilizes the Llama model and Groq Cloud API for intelligent responses.
- **User Authentication**: Google OAuth 2.0 for secure login.
- **Responsive Design**: Built with Material-UI for a modern and responsive user interface.

## Technologies Used

- **Frontend**: React, Material-UI, Axios, React Router
- **Backend**: Node.js, Express, Passport.js, Mongoose
- **Database**: MongoDB
- **Authentication**: Google OAuth 2.0
- **AI Integration**: Groq Cloud API

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:
   - For the backend:
     ```bash
     npm install
     ```
   - For the frontend:
     ```bash
     cd client
     npm install
     ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add your environment variables:
   ```plaintext
   PORT=3001
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GROQCLOUD_API_KEY=your-groqcloud-api-key
   WEB_URL=http://localhost:3000
   ```

4. **Run the application**:
   - Start the backend server:
     ```bash
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd client
     npm start
     ```

## Usage

- **Login**: Use Google OAuth to log in.
- **Chat**: Interact with the AI chatbot for assistance.
- **Dashboard**: Access your profile.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.
