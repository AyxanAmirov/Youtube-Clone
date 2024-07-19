import React, { useEffect, useState } from "react";
import "./style.css";
import { Helmet } from "react-helmet";
import SportElement from "./sportElement";
import { v4 as uuidv4 } from "uuid";

function Sport({ setPosition }) {
  const [videos, setVideos] = useState([]);
const [isLoading, setIsLoading] = useState(true)
  const apiUrl =
    "https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=statistics&part=snippet&part=topicDetails&chart=mostPopular&access_token=AIzaSyDj0qtZu8l447RhOo9fCASoY8VSQSe3i2s&pageToken=CAUQAA&key=AIzaSyCt3KSyMTKlM91xEb66_1juABoin3zvLbw";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    setPosition(false);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setVideos(data.items));
      return () => clearTimeout(timeout);

  }, []);
  return (
    <>
      {
        isLoading?<div className="row">
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
      </div>:<><Helmet>
        <title>Idman - YouTube</title>
      </Helmet>
      <div className="grid-container videos-body">
        {videos?.map((video) => {
          return <SportElement key={uuidv4()} video={video} />;
        })}
      </div></>
      }
    </>
  );
}

export default Sport;
