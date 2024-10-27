// App.js
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
import axios from 'axios'; // Import axios

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

  // New states for summary and lesson plan
  const [summary, setSummary] = useState('');
  const [lessonPlan, setLessonPlan] = useState('');
  const [loading, setLoading] = useState(false); // State to handle loading

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputUrl(event.target.value);
  };

  // Function to handle button click to load the video and get data
  const handleAnalyzeClick = async () => {
    if (inputUrl) {
      if (isValidYouTubeUrl(inputUrl)) {
        try {
          setLoading(true); // Start loading
          // Send POST request to the backend
          const response = await axios.post('http://localhost:5000/api/video-to-text', {
            link: inputUrl,
          });

          // Destructure the response data
          const { summary, lesson_plan } = response.data;

          // Update the state with received data
          setSummary(summary);
          setLessonPlan(lesson_plan);

          setVideoUrl(inputUrl); // Update the video URL
          setInputUrl(''); // Clear the input field
          setError(''); // Clear any existing error
        } catch (error) {
          console.error('Error during analysis:', error);
          setError('Error analyzing the video.');
          setOpenError(true); // Show the error Snackbar
        } finally {
          setLoading(false); // Stop loading
        }
      } else {
        setError('Invalid YouTube video link');
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
                      // Implement file upload handling if needed
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
          <button onClick={handleAnalyzeClick} className="analyze-button">
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
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
          <Route
            path="/"
            element={<StudySection summary={summary} lessonPlan={lessonPlan} loading={loading} />}
          />
          <Route
            path="/study"
            element={<StudySection summary={summary} lessonPlan={lessonPlan} loading={loading} />}
          />
          <Route path="/testing" element={<TestingSection />} />
          <Route path="/multimedia" element={<MultimediaSection />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
