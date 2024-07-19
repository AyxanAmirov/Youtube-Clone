import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import moment from "moment";
import numeral from "numeral";

function RightVideos({ video }) {
  return (
    <div className="right-box">
      <Link to={`/video/${video.id}`}>
        <img
          src={video.snippet.thumbnails.medium.url}
          alt=""
          className="right-cover"
        />
      </Link>

      <div className="box-inform">
        <h4 className="right-title">{video.snippet.title}</h4>
        <Link
          to={`/channel/${video.snippet.channelId}`}
          className="channel-tittle"
        >
          {video.snippet.channelTitle}
        </Link>
        <div className="videoPublish">
          <p className="watched">
            {numeral(video.statistics.viewCount).format("0.0a")}
          </p>
          <span style={{ marginTop: "-17px", fontSize: "30px" }}>.</span>
          <p className="pub">{moment(video.snippet.publishedAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
}

export default RightVideos;
