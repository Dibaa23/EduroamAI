// server.js
const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies
const PORT = process.env.PORT || 5001;

// In-memory conversation history cache for a single conversation
let conversationHistory = [];

// Chatbot endpoint
app.post('/api/chat', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    console.log("Received message:", message);

    // Append the user's message to the conversation history
    conversationHistory.push(`Human: ${message}`);

    // Construct the full context to pass to the AI
    const fullContext = conversationHistory.join("\n") + "\nAssistant:";

    // Spawn a child process to run the Python script with the full conversation context
    const pythonProcess = spawn('python', ['chatbot.py', fullContext]);

    let responseText = '';

    // Capture data from the Python script's stdout
    pythonProcess.stdout.on('data', (data) => {
      responseText += data.toString();
    });

    // Handle errors from the Python script
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error from Python script: ${data}`);
    });

    // When the Python script completes, send the response back to the client
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        res.status(500).json({ error: 'Error communicating with the chatbot API' });
      } else {
        // Append the chatbot's response to the conversation history
        conversationHistory.push(`Assistant: ${responseText.trim()}`);

        // Send the response back to the client
        res.json({ response: responseText.trim() });
      }
    });
  } catch (error) {
    console.error('Error communicating with the Python chatbot:', error.message);
    res.status(500).json({ error: 'Error communicating with the chatbot API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
