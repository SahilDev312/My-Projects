import React, { useState } from 'react';
import YouTube from 'react-youtube'; // Import react-youtube

const styles = {
  videoList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  videoPlayer: {
    marginBottom: '16px',
    width: '100%',
    maxWidth: '1000px', // Adjust as needed
  },
  videoThumbnails: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
  },
  videoThumbnail: {
    cursor: 'pointer',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    maxWidth: '320px', // Adjust as needed
  },
  videoThumbnailHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  thumbnailImage: {
    width: '100%',
    height: 'auto',
  },
  thumbnailTitle: {
    padding: '8px',
    margin: '0',
    textAlign: 'center',
    fontSize: '16px',
    color: '#333',
  },
};

const VideoList = ({ videos }) => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const handleVideoClick = (videoId) => {
    setSelectedVideoId(videoId);
  };

  return (
    <div style={styles.videoList}>
      {selectedVideoId && (
        <div style={styles.videoPlayer}>
          <YouTube videoId={selectedVideoId} opts={{ height: '390', width: '640' }} />
        </div>
      )}
      <div style={styles.videoThumbnails}>
        {videos.map((video) => (
          <div
            key={video.id}
            style={{
              ...styles.videoThumbnail,
              ...(selectedVideoId === video.id ? styles.videoThumbnailHover : {}),
            }}
            onClick={() => handleVideoClick(video.id)}
          >
            <img src={video.thumbnail} alt={video.title} style={styles.thumbnailImage} />
            <p style={styles.thumbnailTitle}>{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
