require('dotenv').config();
require('./passport-setup'); // Ensure passport setup is configured correctly

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;
const apiKey = process.env.GROQCLOUD_API_KEY;

// Middleware setup
app.use(bodyParser.json());
app.use(cors({ origin: process.env.WEB_URL, credentials: true }));
app.use(session({ secret: 'your-session-secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  console.log('Google auth callback - user:', req.user);
  res.redirect(process.env.WEB_URL + '/dashboard');
});

app.get('/api/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.get('/api/current_user', (req, res) => {
  console.log('Current user:', req.user);
  res.json(req.user || null);
});

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
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error with AI response' });
  }
});

const processMessage = async (message) => {
  const apiKey = process.env.GROQCLOUD_API_KEY;
  
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-70b-versatile',
        messages: [{ role: 'user', content: message }],
      },
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
 
    console.log('Response from model:', response.data);
    return { response: response.data.choices[0].message.content }; // Ensure proper property based on actual API response
  } catch (error) {
    console.error('Error processing message from model:', error.response ? error.response.data : error.message);
    throw new Error('Error with AI response');
  }
};
// Updated chat message endpoint
app.post('/api/chat/message', async (req, res) => {
  const { message } = req.body; // Expecting message in the request body

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await processMessage(message); // Ensure this function is defined correctly
    res.json(response); // Send the response back
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Error processing message' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});