import axios from 'axios';

const API_URL = url + '/api/chat';

let sessionId = null; // Consider using a more persistent storage method

export const chatService = {
  startChat: async () => {
    try {
      const response = await axios.post(`${API_URL}/start`);
      sessionId = response.data.sessionId; // Store session ID
      return response.data;
    } catch (error) {
      console.error('Error starting chat:', error);
      throw new Error('Failed to start chat session.'); // Provide a more user-friendly error
    }
  },

  sendMessage: async (message) => {
    if (!sessionId) {
      throw new Error('Chat session not started');
    }
    try {
      const response = await axios.post(`${API_URL}/message`, { sessionId, message });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message.'); // Provide a more user-friendly error
    }
  },

  getChatHistory: async () => {
    if (!sessionId) {
      throw new Error('Chat session not started');
    }
    try {
      const response = await axios.get(`${API_URL}/history/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw new Error('Failed to fetch chat history.'); // Provide a more user-friendly error
    }
  }
};
