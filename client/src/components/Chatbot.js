import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/Chatbot.css';

const url = process.env.REACT_APP_API_URL

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    startChat(); // Start chat when component mounts
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startChat = async () => {
    try {
      // Start chat logic can be implemented here if needed
      // For example, you can initialize the chat or fetch initial messages
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("Send button clicked"); 
  
    if (!input.trim()) {
      console.log("Input is empty."); // Log if input is empty
      return; // Ensure input is not empty
    }
  
    const newMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, newMessage]); // Add user message to chat
    setInput(''); // Clear input field
    setLoading(true); // Start loading
  
    try {
      console.log("Sending message:", { message: input }); // Log the message being sent
      const response = await axios.post(url + '/api/chat/message', {
        message: input // Send the message
      });
      
      console.log("Response received from server:", response.data); // Log the response from the server
      if (response.data && response.data.response) {
        setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: response.data.response }]); // Add assistant message to chat
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      if (error.response) {
        console.error('Error response:', error.response.data); // Log detailed error response from the server
      }
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }]);
    } finally {
      setLoading(false); // End loading
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chatbot">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
        {loading && <div className="loading-spinner">Loading...</div>}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input state
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button> {/* Ensure button type is submit */}
      </form>
    </div>
  );
}

export default Chatbot;