import { Helmet } from "react-helmet";
import "./style.css";
import React, { useEffect, useState } from "react";
import Video from "../videos/video";
import { v4 as uuidv4 } from "uuid";

function Intro({ setToggleNone, setPosition }) {
  const [videos, setVideos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl =
    "https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=statistics&part=snippet&part=topicDetails&chart=mostPopular&access_token=AIzaSyDj0qtZu8l447RhOo9fCASoY8VSQSe3i2s&pageToken=CAUQAA&key=AIzaSyCt3KSyMTKlM91xEb66_1juABoin3zvLbw";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setVideos(data.items));

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div>
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
        <>
          <Helmet>
            <title>YouTube</title>
          </Helmet>

          <div className="grid-container videos-body">
            {videos &&
              videos.map((video) => (
                <Video
                  key={uuidv4()}
                  video={video}
                  setToggleNone={setToggleNone}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
export default Intro;
