require('dotenv').config();
require('./passport-setup'); // Ensure passport setup is configured correctly
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const chatRoutes = require('./routes/chatRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios'); // Add axios
const mongoose = require('mongoose'); // Add mongoose

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chatbot', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Chat Message Schema
const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  messages: { type: Array, required: true },
});

const Message = mongoose.model('Message', messageSchema);

// Save chat history
app.post('/api/chat/save', async (req, res) => {
  const { userId, messages } = req.body;
  try {
    await Message.findOneAndUpdate({ userId }, { messages }, { upsert: true });
    res.status(200).send('Chat history saved');
  } catch (error) {
    console.error('Error saving chat history:', error);
    res.status(500).send('Error saving chat history');
  }
});



// Auth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Google auth callback - user:', req.user);
    res.redirect('http://localhost:3000/dashboard'); // Redirect to your frontend or a success page
  });

app.get('/api/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.get('/api/current_user', (req, res) => {
  console.log('Current user:', req.user); // Add this line
  res.json(req.user || null);
});

// GroqCloud API setup
const apiKey = process.env.GROQCLOUD_API_KEY;

const structureResponse = (response) => {
  const pointsRegex = /(?:\d+\.\s*|•\s*|-\s*)(.+)/g;
  const structuredPoints = response.split('\n').map((line) => {
    const match = line.match(pointsRegex);
    return match ? `<li>${match[0]}</li>` : line;
  });

  return structuredPoints.length ? `<ul>${structuredPoints.join('')}</ul>` : response;
};

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  const { message = "Hi! How can I assist you today?" } = req.body;
  
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-70b-versatile',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      }
    );
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error with AI response' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});