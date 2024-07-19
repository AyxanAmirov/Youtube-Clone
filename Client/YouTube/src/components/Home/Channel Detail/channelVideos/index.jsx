import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
function ChannelVideos({ video }) {
  return (
    <div className="video-item">
      <Link to={`/video/${video.id.videoId}`}>
        <img
          src={video.snippet.thumbnails.medium.url}
          alt="video photo"
          className="video-cover"
        />
      </Link>
      <div className="video-inform">
        <div className="text-inform">
          <p className="video-title">{video.snippet.title}</p>
          <Link
            to={`/channel/${video.snippet.channelId}`}
            className="channel-title"
          >
            {video.snippet.channelTitle}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChannelVideos;
