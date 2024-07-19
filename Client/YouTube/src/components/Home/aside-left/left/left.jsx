import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LeftSubs({ subscription }) {
  const [channelInfo, setChannelInfo] = useState([]);

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&part=statistics&part=snippet&part=topicDetails&chart=mostPopular&access_token=AIzaSyDj0qtZu8l447RhOo9fCASoY8VSQSe3i2s&key=AIzaSyCt3KSyMTKlM91xEb66_1juABoin3zvLbw&id=${subscription.channelId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setChannelInfo(data.items);
      });
  }, []);

  return (
    <>
      {channelInfo.slice(0, 3).map((channel) => (
        <Link
          to={`/channel/${channel.id}`}
          key={channel.id}
          className="icon-txt"
        >
          <img
            src={channel.snippet.thumbnails.medium.url}
            alt=""
            className="kanal-image"
          />
          <p className="">{channel.snippet.title}</p>
        </Link>
      ))}
    </>
  );
}

export default LeftSubs;
