import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="video-player-container">
      <ReactPlayer
        url={videoUrl} // Use the videoUrl prop
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
