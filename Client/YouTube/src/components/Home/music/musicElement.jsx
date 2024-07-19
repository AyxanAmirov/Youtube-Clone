import moment from "moment";
import numeral from "numeral";
import React from "react";
import { Link } from "react-router-dom";

function MusicElement({ video }) {
  return (
    <div className="video-item">
      <Link to={`/video/${video.id}`}>
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
          <div className="watch-time">
            <p className="watch">
              {numeral(video.statistics.viewCount).format("0.0a")}
            </p>
            <p className="publish-time">
              {moment(video.snippet.publishedAt).fromNow()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicElement;
