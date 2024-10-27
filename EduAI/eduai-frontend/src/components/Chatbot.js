import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios'; // Import axios

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      // Add the user's message to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: userInput }
      ]);

      try {
        // Make an API call to the Flask backend with the user's message
        const response = await axios.post('http://localhost:5000/api/chat', {
          user_id: 'unique_user_id',  // You can use a real user ID here if available
          message: userInput
        });

        // Get the response from the Flask server
        const botResponse = response.data.response;

        // Add the bot's response to the chat history
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: botResponse }
        ]);
      } catch (error) {
        console.error("Error communicating with the chatbot API:", error);

        // Optionally, display an error message in the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Error: Unable to reach the AI server." }
        ]);
      }

      // Clear the input field
      setUserInput("");
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="chatbot-container">
      <Typography variant="h6" className="eduai-title">EduAI</Typography>
      
      <Box className="messages-box" sx={{ flexGrow: 1, overflowY: "auto", marginBottom: 2 }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: 1,
            }}
          >
            <Typography
              sx={{
                backgroundColor: message.sender === "user" ? "#4A90E2" : "#f1f1f1",
                color: message.sender === "user" ? "white" : "black",
                padding: "8px 12px",
                borderRadius: "12px",
                maxWidth: "70%",
                wordBreak: "break-word",
              }}
            >
              {message.text}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          value={userInput}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Type your message..."
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Box>
    </div>
  );
};

export default Chatbot;
