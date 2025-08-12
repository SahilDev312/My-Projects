import React, { useState, useEffect } from 'react';
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import { useAppSelector, useAppDispatch } from '../Hooks/useApp';
import { getHomeVideo } from '../store/reducer/getHomeVideo';
import VideoList from '../Component/VideoList'; // Import VideoList component
import ReactPlayer from 'react-player';
const Home = () => {
  const dispatch = useAppDispatch();
  const { videos, status, error } = useAppSelector((state) => state.YouTubeApp);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    dispatch(getHomeVideo({ query: 'react tutorials', isNext: false })); // Fetch the initial set of videos
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const handleVideoClick = (videoId) => {
    setPlayingVideoId(videoId);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 mt-16">
        <Navbar />
        <main className="p-4">
          <h1>Video Content</h1>
          {playingVideoId ? (
            <div className="mb-4">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${playingVideoId}`}
                controls={true}
                width="100%"
                height="auto"
              />
              <button
                onClick={() => setPlayingVideoId(null)}
                className="mt-2 p-2 bg-red-500 text-white rounded"
              >
                Close Player
              </button>
            </div>
          ) : (
            <VideoList videos={videos} onVideoClick={handleVideoClick} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
