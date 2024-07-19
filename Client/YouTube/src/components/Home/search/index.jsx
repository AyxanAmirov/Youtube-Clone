import React, { useEffect, useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import NewVideos from "./NewVideos/NewVideos";
import { v4 as uuidv4 } from "uuid";

function Search() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { name } = useParams();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1000000&key=AIzaSyCt3KSyMTKlM91xEb66_1juABoin3zvLbw&q=${name}`
    )
      .then((data) => data.json())
      .then((youtubeData) => {
        setVideos(youtubeData.items);
      });
    return () => clearTimeout(timeout);
  }, [name]);

  return (
    <div className="container">
      {isLoading ? (
        <div className="row">
          <div className="container-skeleton">
            <div className="grid-row grid-1-1">
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
          <div className="news">
            {videos.length > 0 &&
              videos.map((video) => {
                return <NewVideos key={uuidv4()} video={video} />;
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
