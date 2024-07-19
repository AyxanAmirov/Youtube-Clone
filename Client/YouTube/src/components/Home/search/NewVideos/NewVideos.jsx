import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

function NewVideos({ video }) {
  return (
    <div className="new-videos">
      <Link
        to={`/video/${video.id.videoId}`}
        className="col-lg-4 col-md-4 col-sm-4 col-4"
      >
        <img
          src={video.snippet.thumbnails.medium.url}
          alt=""
          className="new-cover"
        />
      </Link>
      <div className="col-lg-8 col-md-8 col-sm-8 col-8">
        <p className="new-video-tittle">{video.snippet.title}</p>
        <div className="new-date  search-info">
          <p className="font-color">9,5K baxış</p>
          <p className="font-color">
            {moment(video.snippet.publishTime).fromNow()}
          </p>
        </div>
        <div className="search-info  align-center">
          <Link
            to={`/channel/${video.snippet.channelId}`}
            className="profil-name font-color"
          >
            {video.snippet.channelTitle}
          </Link>
        </div>
        <p className="new-desc font-color">{video.snippet.title}</p>
      </div>
    </div>
  );
}

export default NewVideos;
