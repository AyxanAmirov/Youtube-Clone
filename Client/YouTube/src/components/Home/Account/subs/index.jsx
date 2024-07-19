import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Subs({ subscription }) {
  const [channelInfo, setChannelInfo] = useState([]);
  const [subscribe, setSubscribe] = useState(false);

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&part=statistics&part=snippet&part=topicDetails&chart=mostPopular&access_token=AIzaSyDj0qtZu8l447RhOo9fCASoY8VSQSe3i2s&key=AIzaSyCt3KSyMTKlM91xEb66_1juABoin3zvLbw&id=${subscription.channelId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.items && Array.isArray(data.items)) {
          setChannelInfo(data.items);
        }
      })
      .catch((error) => {
        console.error("Error fetching channel info:", error);
      });
  }, [subscription.channelId]);

  if (!channelInfo || channelInfo.length === 0) {
    return <p>Loading...</p>;
  }
  const addSub = (id) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const newSubs = {
      userEmail: userInfo.userEmail,
      channelId: id,
    };
    if (newSubs) {
      fetch("http://localhost:3000/subs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubs),
      });
      setSubscribe(false);
    }
  };
  const removeSub = (id) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:3000/subs")
      .then((resp) => resp.json())
      .then((data) => {
        const existingSubscription = data.find(
          (channels) =>
            channels.channelId.includes(id) &&
            channels.userEmail.includes(userInfo.userEmail)
        );
        if (existingSubscription) {
          fetch(`http://localhost:3000/subs/${existingSubscription.id}`, {
            method: "DELETE",
          });
          setSubscribe(true);
        }
      });
  };

  return (
    <>
      {channelInfo.map((channel) => (
        <div className="sub">
          <Link to={`/channel/${channel.id}`} key={channel.id}>
            <img
              src={channel.snippet.thumbnails.medium.url}
              alt=""
              className="sub-img"
            />
          </Link>
          <div className="channel-inform">
            <p className="sub-title">{channel.snippet.title}</p>
            <p className="subscribers">
              {numeral(channel.statistics.subscriberCount).format("0.0a")}{" "}
              abunəçi
            </p>
            {subscribe ? (
              <p className="subscribe" onClick={() => addSub(channel.id)}>
                Abunə Ol
              </p>
            ) : (
              <p className="subscribe" onClick={() => removeSub(channel.id)}>
                Abunə Olunub
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default Subs;
