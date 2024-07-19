import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import "./style.css";
import numeral from "numeral";
import ChannelVideos from "./channelVideos";

function Detail({ setPosition, setLogin }) {
  const [accountInfo, setAccountInfo] = useState();
  const [subscribe, setSubscribe] = useState(false);
  const [videos, setVideos] = useState([]);
  const [detailsPopup, setDetailsPopup] = useState(false);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setPosition(false);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&part=statistics&part=snippet&part=topicDetails&chart=mostPopular&access_token=AIzaSyDj0qtZu8l447RhOo9fCASoY8VSQSe3i2s&key=AIzaSyCt3KSyMTKlM91xEb66_1juABoin3zvLbw&id=${id}`
    )
      .then((data) => data.json())
      .then((resp) => {
        setAccountInfo(resp);
        checkSubscription(resp.items[0].id);
      })
      .catch((error) => console.error("Error fetching account info:", error));
  }, [id]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=100000&key=AIzaSyDj0qtZu8l447RhOo9fCASoY8VSQSe3i2s&q=${accountInfo?.items[0]?.snippet.title}`
    )
      .then((data) => data.json())
      .then((youtubeVideo) => setVideos(youtubeVideo));
    return () => clearTimeout(timeout);
  }, [accountInfo]);

  const checkSubscription = (channelId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:3000/subs")
      .then((data) => data.json())
      .then((subs) => {
        const include = subs.some(
          (channel) =>
            channel.channelId === channelId &&
            channel.userEmail === user.userEmail
        );
        setSubscribe(include);
      });
  };

  const addSub = (channelId) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      const newSubs = {
        userEmail: userInfo.userEmail,
        channelId: channelId,
      };
      fetch("http://localhost:3000/subs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubs),
      })
        .then(() => setSubscribe(true))
        .catch((error) => console.error("Error adding subscription:", error));
    } else {
      setDetailsPopup(!detailsPopup);
    }
  };

  const removeSub = (channelId) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:3000/subs")
      .then((resp) => resp.json())
      .then((data) => {
        const existingSubscription = data.find(
          (channel) =>
            channel.channelId === channelId &&
            channel.userEmail === userInfo.userEmail
        );
        if (existingSubscription) {
          fetch(`http://localhost:3000/subs/${existingSubscription.id}`, {
            method: "DELETE",
          })
            .then(() => setSubscribe(false))
            .catch((error) =>
              console.error("Error removing subscription:", error)
            );
        }
      })
      .catch((error) => console.error("Error fetching subscriptions:", error));
  };

  if (!accountInfo || !videos || !videos.items) {
    return (
      <div className="row">
        <div className="container-skeleton">
          <div className="grid-row grid-4-4">
            <div className="cards">
              <div className="card_image loading" />
              <div className="card_title loading" />
              <div className="card_description loading" />
            </div>
            <div className="cards">
              <div className="card_image loading" />
              <div className="card_title loading" />
              <div className="card_description loading" />
            </div>
            <div className="cards">
              <div className="card_image loading" />
              <div className="card_title loading" />
              <div className="card_description loading" />
            </div>
            <div className="cards">
              <div className="card_image loading" />
              <div className="card_title loading" />
              <div className="card_description loading" />
            </div>
            <div className="cards">
              <div className="card_image loading" />
              <div className="card_title loading" />
              <div className="card_description loading" />
            </div>
            <div className="cards">
              <div className="card_image loading" />
              <div className="card_title loading" />
              <div className="card_description loading" />
            </div>
            <div className="cards">
              <div className="card_image loading" />
              <div className="card_title loading" />
              <div className="card_description loading" />
            </div>
            <div className="cards">
              <div className="card_image loading" />
              <div className="card_title loading" />
              <div className="card_description loading" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredVideos = videos?.items.filter((video) => {
    return video.snippet.channelTitle === accountInfo.items[0].snippet.title;
  });
  return (
    <>
      {isLoading ? (
        <div className="row">
          <div className="container-skeleton">
            <div className="grid-row grid-4-4">
              <div className="cards">
                <div className="card_image loading" />
                <div className="card_title loading" />
                <div className="card_description loading" />
              </div>
              <div className="cards">
                <div className="card_image loading" />
                <div className="card_title loading" />
                <div className="card_description loading" />
              </div>
              <div className="cards">
                <div className="card_image loading" />
                <div className="card_title loading" />
                <div className="card_description loading" />
              </div>
              <div className="cards">
                <div className="card_image loading" />
                <div className="card_title loading" />
                <div className="card_description loading" />
              </div>
              <div className="cards">
                <div className="card_image loading" />
                <div className="card_title loading" />
                <div className="card_description loading" />
              </div>
              <div className="cards">
                <div className="card_image loading" />
                <div className="card_title loading" />
                <div className="card_description loading" />
              </div>
              <div className="cards">
                <div className="card_image loading" />
                <div className="card_title loading" />
                <div className="card_description loading" />
              </div>
              <div className="cards">
                <div className="card_image loading" />
                <div className="card_title loading" />
                <div className="card_description loading" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="account-body">
          <Helmet>
            <title>{accountInfo.items[0].snippet.title} - YouTube</title>
          </Helmet>

          <div className="profil-body">
            <img
              src={accountInfo.items[0].snippet.thumbnails.default.url}
              className="profil-cover"
              alt="Profile Cover"
            ></img>

            <div className="account-inform">
              <h3 className="account-name">
                {accountInfo.items[0].snippet.title}
              </h3>
              <p className="account-email">
                @{accountInfo.items[0].snippet.title} ‧{" "}
                {numeral(
                  accountInfo.items[0].statistics.subscriberCount
                ).format("0.0a")}{" "}
                abunə ‧{" "}
                {numeral(accountInfo.items[0].statistics.videoCount).format(
                  "0.0a"
                )}{" "}
                video
              </p>
              <p className="account-email">
                {accountInfo.items[0].snippet.description}
              </p>
              {subscribe ? (
                <p
                  className="subscribe-channel"
                  onClick={() => removeSub(accountInfo.items[0].id)}
                >
                  Abunə Olunub
                </p>
              ) : (
                <p
                  className="not-subscribe-channel"
                  onClick={() => addSub(accountInfo.items[0].id)}
                >
                  Abunə Ol
                </p>
              )}
            </div>

            {detailsPopup ? (
              <div className="details-popup">
                <p className="popup-text">
                  Bu kanala abunə olmaq istəyirsiniz?
                </p>
                <p className="popup-text">
                  Kanala abunə olmaq üçün heasınıza daxil olun.
                </p>
                <button
                  className="popup-login-btn"
                  onClick={() => setLogin(true)}
                >
                  Login
                </button>
              </div>
            ) : null}
          </div>

          <div className="grid-container videos-body">
            {filteredVideos?.map((video) => {
              return <ChannelVideos key={video.id} video={video} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;
