import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: userInput },
        { sender: "bot", text: "This is a simulated response." }
      ]);
      setUserInput(""); // Clear the input field
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
