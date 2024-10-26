import React, { useState } from 'react';
import './App.css';
import TableOfContents from './components/TableOfContents'; // Left column
import VideoPlayer from './components/VideoPlayer'; // Top right (Reference)
import Chatbot from './components/Chatbot'; // Bottom right (Reference)
import StudySection from './components/StudySection'; // Study Section (Summary + Lesson Plan)
import TestingSection from './components/TestingSection'; // Testing Section (Quiz)
import MultimediaSection from './components/MultimediaSection'; // Multimedia Section (Recommendations)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IconButton, InputAdornment, TextField, Snackbar, Alert } from '@mui/material';
import UploadIcon from '@mui/icons-material/UploadFile';

// Function to validate YouTube URLs
const isValidYouTubeUrl = (url) => {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return regex.test(url);
};

const App = () => {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=DqxxkI0fy-c');
  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState(''); // State to track errors
  const [openError, setOpenError] = useState(false); // State to handle Snackbar visibility

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputUrl(event.target.value);
  };

  // Function to handle button click to load the video
  const handleAnalyzeClick = () => {
    if (inputUrl) {
      if (isValidYouTubeUrl(inputUrl)) {
        setVideoUrl(inputUrl); // Update the video URL
        setInputUrl(''); // Clear the input field
        setError(''); // Clear any existing error
      } else {
        setError('Invalid YouTube video link');
        setOpenError(true); // Show the error Snackbar
      }
    }
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
      if (validVideoTypes.includes(file.type)) {
        const fileUrl = URL.createObjectURL(file); // Create a URL for the uploaded file
        setVideoUrl(fileUrl); // Update the video URL with the file's URL
        setError(''); // Clear any existing error
      } else {
        setError('Invalid file type. Please upload a valid video file.');
        setOpenError(true); // Show the error Snackbar
      }
    }
  };

  // Function to handle Snackbar close
  const handleCloseError = () => {
    setOpenError(false);
  };

  return (
    <Router>
      {/* Header Bar */}
      <div className="header-bar">
        {/* Container for Input and File Upload */}
        <div className="input-container">
          <TextField
            variant="outlined"
            placeholder="Enter video link or upload file"
            value={inputUrl}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* File Upload Icon */}
                  <IconButton component="label">
                    <UploadIcon style={{ color: '#ffffff' }} />
                    <input
                      type="file"
                      accept="video/*"
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: '#333333',
              color: '#ffffff',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ffffff',
                },
                '&:hover fieldset': {
                  borderColor: '#5f73f5',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5f73f5',
                },
              },
              '& .MuiInputBase-input': {
                color: '#ffffff',
              },
            }}
          />
          {/* Analyze Button */}
          <button onClick={handleAnalyzeClick} className="analyze-button">Analyze</button>
        </div>
      </div>

      {/* Error Snackbar */}
      <Snackbar
        open={openError}
        autoHideDuration={4000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>

      {/* Main Content */}
      <div className="app-container">
        {/* Left Column (Table of Contents) */}
        <div className="left-column">
          <TableOfContents />
        </div>

        {/* Right Column (Reference Window) */}
        <div className="right-column">
          <div className="video-player">
            <VideoPlayer videoUrl={videoUrl} /> {/* Pass videoUrl as a prop */}
          </div>
          <div className="chatbot-container">
            <Chatbot />
          </div>
        </div>

        {/* Routes to Different Sections */}
        <Routes>
          <Route path="/" element={<StudySection />} />
          <Route path="/study" element={<StudySection />} />
          <Route path="/testing" element={<TestingSection />} />
          <Route path="/multimedia" element={<MultimediaSection />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
