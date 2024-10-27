import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField, Box, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/UploadFile';
import SendIcon from '@mui/icons-material/Send'; // Icon for Submit button
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page transitions
import Slider from 'react-slick'; // Import Slider for carousel
import 'slick-carousel/slick/slick.css'; // Import slick-carousel CSS for styling
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme CSS
import './HomePage.css';

function HomePage({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [fileName, setFileName] = useState(''); // State to store the uploaded file name
  const [youtubeVideos, setYoutubeVideos] = useState([
    { id: 'EM8IgIIiOdY', title: 'I gave 127 interviews. Top 5 Algorithms they asked me.' },
    { id: 'wufc6w8fqvY', title: '3 Months of Learning Leetcode' },
    { id: '6qS83wD29PY', title: '2-Minute Neuroscience: The Neuron' },
    { id: 'kjBOesZCoqc', title: 'Essence of linear algebra' },
    { id: 'KXkBZCe699A', title: 'How does Microsoft Azure work?' },
    { id: 'EFg3u_E6eHU', title: 'How Dijkstra\'s Algorithm Works' },
    { id: 'tZE_fQFK8EY', title: 'Introduction to Biology: Crash Course Biology #1' },
    { id: 'oVtlp72f9NQ', title: 'How to use Retrieval Augmented Generation (RAG)' },
    { id: 'vH2f7cjXjKI', title: 'Claude | Computer use for automating operations' },
    { id: 'EKYat3H1GUc', title: 'How to use NLX Platfrom' },
  ]); // Default YouTube video info
  const navigate = useNavigate(); // Hook for navigating to another page

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name); // Set the uploaded file name
    }
  };

  const handleLinkChange = (e) => {
    setYoutubeLink(e.target.value);
  };

  const handleSubmit = () => {
    if (file || isValidYouTubeUrl(youtubeLink)) {
      onSubmit(file, youtubeLink);
      navigate('/study', { state: { file, youtubeLink } }); // Navigate to result page with data
    }
  };

  const handleVideoClick = (videoId) => {
    setYoutubeLink(`https://www.youtube.com/watch?v=${videoId}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800, // Adjust the speed for a smoother transition
    slidesToShow: 5, // Show more slides to fit the wider container
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    cssEase: 'ease-in-out', // Smooth easing for better transition
  };

  return (
    <div className="scale-wrapper">
      <div className="app-container" style={{ fontSize: '1.5rem', marginTop: '0px' }}>
        <div className="hero-section" style={{ marginTop: '10px' }}>
          <h1 style={{ fontSize: '8rem', marginTop: '48px' }}>EduRoam</h1>
        </div>
        <div className="input-container">
          <div className="link-input">
            <TextField
              variant="outlined"
              placeholder="Enter YouTube link here..."
              value={youtubeLink}
              onChange={handleLinkChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton component="label" style={{ fontSize: '2rem', padding: '16px' }}>
                      <UploadIcon style={{ color: '#ffffff', fontSize: '2rem' }} />
                      <input
                        type="file"
                        accept="video/mp4"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" sx={{ padding: 0 }}>
                    <Box
                      sx={{
                        backgroundColor: '#5f73f5',
                        borderRadius: '50%', // Make the send icon box circular
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center', // Center the icon within the box
                        cursor: 'pointer',
                        width: '48px',
                        height: '48px',
                        '&:hover': {
                          backgroundColor: '#4349a1',
                        },
                      }}
                      onClick={handleSubmit}
                    >
                      <IconButton
                        style={{ color: '#ffffff', fontSize: '2rem', padding: '0' }} // Set padding to 0 to center icon
                      >
                        <SendIcon />
                      </IconButton>
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                borderRadius: '32px',
                '& fieldset': {
                  borderRadius: '32px', // Make the border as round as the search bar
                },
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
                  fontSize: '1.5rem',
                },
              }}
              style={{ width: '1000px', marginTop: '-125px' }}
            />
            {fileName && (
              <Typography
                variant="body2"
                sx={{ color: '#ffffff', marginTop: '8px' }}
              >
                Uploaded file: {fileName}
              </Typography>
            )}
          </div>
        </div>

        {/* YouTube Video Carousel */}
        <div className="carousel-container" style={{ height: '100%', width: '80%', marginTop: '20px', padding: '0 2vw' }}>
          <Slider {...settings}>
            {youtubeVideos.map((video) => (
              <div key={video.id} onClick={() => handleVideoClick(video.id)} style={{ cursor: 'pointer', padding: '0 10px' }}>
                <img
                  src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
                  alt={video.title}
                  style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

// Function to validate YouTube URLs
const isValidYouTubeUrl = (url) => {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return regex.test(url);
};

export default HomePage;
