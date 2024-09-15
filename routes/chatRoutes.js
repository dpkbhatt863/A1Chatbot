const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// In-memory storage for chat sessions (replace with a database in production)
const chatSessions = {};

// Start or continue a chat session
router.post('/start', (req, res) => {
  const sessionId = Date.now().toString(); // Generate a simple session ID
  chatSessions[sessionId] = { messages: [] };
  res.json({ sessionId });
});

// Process a message in the chat session
router.post('/message', async (req, res) => {
  const { sessionId, message } = req.body;

  if (!chatSessions[sessionId]) {
    return res.status(400).json({ error: 'No active chat session' });
  }

  chatSessions[sessionId].messages.push({ role: 'user', content: message });

  try {
    console.log('Attempting to call Groq API...');
    console.log('API Key being used:', process.env.GROQCLOUD_API_KEY);
    console.log('Request payload:', {
      model: 'llama-3.1-70b-versatile',
      messages: chatSessions[sessionId].messages,
      max_tokens: 1000,
    });

    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama-3.1-70b-versatile',
      messages: chatSessions[sessionId].messages,
      max_tokens: 1000,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GROQCLOUD_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds timeout
    });

    console.log('Groq API response:', response.data);

    const aiMessage = response.data.choices[0].message.content;
    chatSessions[sessionId].messages.push({ role: 'assistant', content: aiMessage });

    res.json({ message: aiMessage });
  } catch (error) {
    console.error('Error calling Groq API:', error);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Get chat history
router.get('/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  if (!chatSessions[sessionId]) {
    return res.json({ messages: [] });
  }
  res.json({ messages: chatSessions[sessionId].messages });
});

// Debug logging
console.log('GROQCLOUD_API_KEY:', process.env.GROQCLOUD_API_KEY);
console.log('Environment variables:', process.env);

module.exports = router;