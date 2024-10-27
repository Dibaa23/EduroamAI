import './App.css';
import HomePage from './components/HomePage'; // Import your HomePage component
import React, { useState, useEffect } from 'react';
import TableOfContents from './components/TableOfContents'; // Left column
import VideoPlayer from './components/VideoPlayer'; // Top right (Reference)
import Chatbot from './components/Chatbot'; // Bottom right (Reference)
import StudySection from './components/StudySection'; // Study Section (Summary + Lesson Plan)
import TestingSection from './components/TestingSection'; // Testing Section (Quiz)
import MultimediaSection from './components/MultimediaSection'; // Multimedia Section (Recommendations)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IconButton, InputAdornment, TextField, Snackbar, Alert } from '@mui/material'; // Add TextField here
import UploadIcon from '@mui/icons-material/UploadFile';

// Function to validate YouTube URLs
const isValidYouTubeUrl = (url) => {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return regex.test(url);
};

const App = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track if form is submitted
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=DqxxkI0fy-c');
  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState(''); // State to track errors
  const [openError, setOpenError] = useState(false); // State to handle Snackbar visibility

  // Function to handle form submission from HomePage
  const handleSubmit = (file, youtubeLink) => {
    setIsSubmitted(true); // Set form submission state to true

    // If a YouTube link is provided, use it
    if (youtubeLink) {
      setVideoUrl(youtubeLink);
    } else if (file) {
      // If a file is provided, create a URL for it
      const fileUrl = URL.createObjectURL(file);
      setVideoUrl(fileUrl);
    }
  };

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

  // Ensure particle effects are initialized properly on page load
  useEffect(() => {
    const particleContainer = document.querySelector('.particle-background');
    if (particleContainer) {
      // Create a number of particles for background
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particleContainer.appendChild(particle);
      }
    }
  }, []);

  // Function to handle the click on "EduRome" title to reset the view
  const handleTitleClick = () => {
    setIsSubmitted(false); // Reset form submission state to false
  };

  return (
    <Router>
      {/* Background for particles */}
      <div className="particle-background"></div>

      {/* HomePage should be visible until form is submitted */}
      <div className={`homepage-wrapper ${isSubmitted ? 'hidden' : ''}`}>
        <HomePage onSubmit={handleSubmit} />
      </div>

      {/* Main Content should be hidden until form is submitted */}
      <div className={`app-container ${isSubmitted ? '' : 'hidden'}`}>
        {/* Header Bar */}
        <div className="header-bar">
          {/* Clickable Title */}
          <h1 className="eduai-title" onClick={handleTitleClick} style={{ cursor: 'pointer', margin: '0', textAlign: 'center', width: '100%' }}>
            EduRome
          </h1>
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
        <div className="content-wrapper">
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
      </div>
    </Router>
  );
};

export default App;
