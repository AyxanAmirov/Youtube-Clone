import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import numeral from "numeral";

function AfterWatch({ setPosition, setLogin }) {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userHave, setUserHave] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    setPosition(false);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo?.userEmail) {
      fetch("http://localhost:3000/saved")
        .then((data) => data.json())
        .then((res) => {
          let trueElem = res.filter((element) =>
            element.userEmail?.includes(userInfo.userEmail)
          );
          setVideos(trueElem.reverse());
        });
    } else {
      setUserHave(false);
    }
    return () => clearTimeout(timeout);
  }, []);

  function deleteVideo(videoId) {
    fetch(`http://localhost:3000/saved/${videoId}`, {
      method: "DELETE",
    });
  }

  return (
    <div>
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
          {userHave ? (
            <>
              <Helmet>
                <title>Sonra izləyin - YouTube</title>
              </Helmet>
              <div className="history-body">
                <h2 className="history-head">Sonra İzləyin</h2>
                {videos.map((video) => (
                  <div className="history-video-body" key={video.id}>
                    {video.videoHistory && video.videoHistory.length > 0 && (
                      <>
                        <Link to={`/video/${video.videoHistory[0].id}`}>
                          <img
                            src={
                              video.videoHistory[0]?.snippet?.thumbnails?.medium
                                ?.url
                            }
                            alt=""
                            className="history-cover"
                          />
                        </Link>
                        <div className="history-txt">
                          <p className="history-title">
                            {video.videoHistory[0]?.snippet?.title}
                          </p>
                          <p className="history-inform">
                            <span>
                              {numeral(
                                video.videoHistory[0]?.statistics?.viewCount
                              ).format("0.0a")}{" "}
                              baxış
                            </span>
                          </p>
                          <p className="history-desc">
                            {video.videoHistory[0]?.snippet?.description}
                          </p>
                        </div>
                        <i
                          className="fa-solid fa-x delete-btn"
                          onClick={() => deleteVideo(video.id)}
                        ></i>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="login-account">
              <i className="fa-solid fa-right-to-bracket log-iconn"></i>
              <h2>Kanalınızı fərdiləşdirmək üçün qeydiyyatdan keçin</h2>
              <h4>
                Bəyəndiyiniz videoları yaddaşda saxlamaq üçün qeydiyyatdan keçin
              </h4>
              <button
                className="popup-login-btn"
                onClick={() => setLogin(true)}
              >
                Login
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AfterWatch;
