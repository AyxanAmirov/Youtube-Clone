import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./style.css";
import { Helmet } from "react-helmet";
import RightVideos from "../rightVideos";
import { Link, useParams } from "react-router-dom";
import numeral from "numeral";
import Comments from "./comments";
import { v4 as uuidv4 } from "uuid";

function VideoPlayer({ setToggleMenu, setToggleNone, setPosition, setLogin }) {
  const [apiVideo, setApiVideo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const [userHave, setUserHave] = useState(false);
  const [loginUser, setLoginUser] = useState();
  const [isCommentFocused, setIsCommentFocused] = useState(false);
  const [comment, setComment] = useState();
  const [allVideoComments, setAllVideoComments] = useState([]);
  const [save, setSave] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [likePopup, setLikePopup] = useState(false);
  const [savedPopup, setSavedPopup] = useState(false);
  const [newComment, setNewComment] = useState();

  const [saved, setSaved] = useState({
    saveVideo: false,
    likeVideo: false,
  });

  const apiUrl =
    "https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=statistics&part=snippet&part=topicDetails&chart=mostPopular&access_token=AIzaSyDj0qtZu8l447RhOo9fCASoY8VSQSe3i2s&key=AIzaSyCt3KSyMTKlM91xEb66_1juABoin3zvLbw";
  const videoOnReady = (event) => {};
  useEffect(() => {
    fetch("http://localhost:3000/subs")
      .then((data) => data.json())
      .then((subs) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const include = subs.find(
          (channels) =>
            channels.channelId.includes(apiVideo[0]?.snippet?.channelId) &&
            channels.userEmail.includes(user.userEmail)
        );
        setUserHave(include ? true : false);
      });
  }, [apiVideo]);
  useEffect(() => {
    fetch(`http://localhost:3000/comments`)
      .then((data) => data.json())
      .then((comments) => {
        setAllVideoComments(
          comments.filter((userComment) => userComment.videoId == id)
        );
      });
  }, [comment]);

  useEffect(() => {
    setToggleMenu(true);
    setToggleNone(true);
    fetch(apiUrl)
      .then((data) => data.json())
      .then((youtubeVideo) => setVideos(youtubeVideo));
    setPosition(true);
  }, []);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:3000/user`)
      .then((data) => data.json())
      .then((user) => {
        const loginUser = user.find(
          (channel) => channel.userEmail === userInfo.userEmail
        );
        setLoginUser(loginUser);
      });
  }, []);

  const addComment = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    if (comment.length > 0) {
      fetch(`http://localhost:3000/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userComment: comment,
          userName: loginUser.userName,
          videoId: id,
          userEmail: user.userEmail,
        }),
      })
        .then((response) => response.json())
        .then((newComment) => {
          setAllVideoComments((prevComments) => [...prevComments, newComment]);
          setComment("");
        });
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=statistics&part=snippet&part=topicDetails&id=${id}&access_token=AIzaSyDj0qtZu8l447RhOo9fCASoY8VSQSe3i2s&key=AIzaSyCt3KSyMTKlM91xEb66_1juABoin3zvLbw`
    )
      .then((res) => res.json())
      .then((data) => {
        setApiVideo(data.items);
        setIsLoading(false);

        const userInfo = JSON.parse(localStorage.getItem("user"));

        const newSubs = {
          userEmail: userInfo.userEmail,
          videoHistory: data.items,
        };
        if (newSubs) {
          fetch("http://localhost:3000/videos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newSubs),
          });
        }
      });
  }, [id]);

  //

  function saveVideo(isSaved) {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      fetch(`http://localhost:3000/${isSaved ? "saved" : "liked"}`)
        .then((res) => res.json())
        .then((data) => {
          const existingSubscription = data.find(
            (channel) =>
              channel.videoHistory[0]?.id === apiVideo[0]?.id &&
              channel.userEmail === userInfo.userEmail
          );
          if (existingSubscription) {
            fetch(
              `http://localhost:3000/${isSaved ? "saved" : "liked"}/${
                existingSubscription.id
              }`,
              {
                method: "DELETE",
              }
            );
            if (isSaved) {
              setSaved((prevState) => ({
                ...prevState,
                saveVideo: false,
              }));
            } else {
              setSaved((prevState) => ({
                ...prevState,
                likeVideo: false,
              }));
            }
          } else {
            const newSubs = {
              userEmail: userInfo.userEmail,
              videoHistory: apiVideo,
            };
            if (newSubs) {
              fetch(`http://localhost:3000/${isSaved ? "saved" : "liked"}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newSubs),
              });
              if (isSaved) {
                setSaved((prevState) => ({
                  ...prevState,
                  saveVideo: true,
                }));
              } else {
                setSaved((prevState) => ({
                  ...prevState,
                  likeVideo: true,
                }));
              }
            }
          }
        });
    } else if (!isSaved) {
      setLikePopup(!likePopup);
      setSavedPopup(false);
      setLoginPopup(false);
    } else if (isSaved) {
      setSavedPopup(!savedPopup);
      setLoginPopup(false);
      setLikePopup(false);
    }
  }

  const opts = {
    height: "500",
    width: "100%",
    borderRadius: "40px",
    playerVars: {
      autoplay: 1,
    },
  };
  const newSub = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("user"));

    if (userInfo) {
      const newSubs = {
        userEmail: userInfo.userEmail,
        channelId: apiVideo[0]?.snippet?.channelId,
      };
      setSubscribed(true);
      if (newSubs) {
        await fetch("http://localhost:3000/subs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSubs),
        })
          .then((response) => response.json())
          .then((newSubscription) => {
            setUserHave(true);
          })
          .catch((error) =>
            console.error("Abonelik oluşturulurken bir hata oluştu:", error)
          );
      }
    } else {
      setLoginPopup(!loginPopup);
      setSavedPopup(false);
      setLikePopup(false);
    }
  };

  const removeSub = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:3000/subs")
      .then((resp) => resp.json())
      .then((data) => {
        const existingSubscription = data.find(
          (channels) =>
            channels.channelId.includes(apiVideo[0]?.snippet?.channelId) &&
            channels.userEmail.includes(userInfo.userEmail)
        );
        if (existingSubscription) {
          fetch(`http://localhost:3000/subs/${existingSubscription.id}`, {
            method: "DELETE",
          })
            .then(() => {
              setUserHave(false);
            })
            .catch((error) =>
              console.error("Error removing subscription:", error)
            );
        }
      });
  };
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:3000/saved")
      .then((res) => res.json())
      .then((data) => {
        const existingSubscription = data.find(
          (channel) =>
            channel.videoHistory[0]?.id === id &&
            channel.userEmail === userInfo.userEmail
        );
        if (existingSubscription) {
          setSaved((prevState) => ({
            ...prevState,
            saveVideo: true,
          }));
        }
      });
    fetch("http://localhost:3000/liked")
      .then((res) => res.json())
      .then((data) => {
        const existingSubscription = data.find(
          (channel) =>
            channel.videoHistory[0]?.id === id &&
            channel.userEmail === userInfo.userEmail
        );
        if (existingSubscription) {
          setSaved((prevState) => ({
            ...prevState,
            likeVideo: true,
          }));
        }
      });
  }, []);

  const shareWhatsApp = () => {
    const shareText = `${apiVideo[0].snippet.title}.
    İzləyin: http://localhost:5173/video/${id}`;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, "_blank");
  };
  const shareOptions = () => {
    setShowPopup(true);
    copyLink(false);
  };
  const copyLinkToClipboard = (e) => {
    const videoUrl = `http://localhost:5173/video/${id}`;
    navigator.clipboard.writeText(videoUrl);
    setCopyLink(true);
  };
  const shareMas = () => {
    const shareUrl = `https://www.facebook.com/dialog/send?link=http://localhost:5173/video/${id}&app_id=123456789`;
    window.open(shareUrl, "_blank");
  };
  const closePop = () => {
    setShowPopup(false);
    setCopyLink(false);
  };
  const cancel = () => {
    setIsCommentFocused(false);
  };
  const deleteComment = (id) => {
    fetch(`http://localhost:3000/comments/${id}`, {
      method: "DELETE",
    }).then(() => {
      setAllVideoComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    });
  };
  const updateData = (id) => {
    fetch(`http://localhost:3000/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        userComment: `${newComment}`,
      }),
    })
      .then((response) => response.json())
      .then((updatedCommentData) => {
        setAllVideoComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === id ? updatedCommentData : comment
          )
        );
      });
  };
  const focusİnput = () => {
    setIsCommentFocused(true);
  };
  const addCommentFunc = (e) => {
    if (loginUser) {
      setComment(e.target.value);
    } else {
      setLogin(true);
    }
  };
  return (
    <div className="video-player-container">
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Paylaş</h2>
              <button className="close-button" onClick={closePop}>
                X
              </button>
            </div>
            <div className="popup-body">
              <div className="share-icons">
                <i
                  className="fa-brands fa-facebook-messenger share-icons"
                  onClick={shareMas}
                ></i>
                <i
                  className="fa-brands fa-whatsapp share-icons"
                  onClick={shareWhatsApp}
                ></i>
              </div>
              <button
                className={copyLink ? "copied-btn" : "copy-button"}
                onClick={copyLinkToClipboard}
              >
                {copyLink ? "Kopyalandı" : "Linki Kopyala"}
              </button>
            </div>
          </div>
        </div>
      )}
      <>
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <div className="screen-right">
            <Helmet>
              <title>{apiVideo[0].snippet.title}</title>
            </Helmet>
            <div className="videoWrapper">
              <YouTube
                videoId={apiVideo[0].id}
                opts={opts}
                onReady={videoOnReady}
              />

              <div className="video-info">
                <h4 className="video-tittle">{apiVideo[0].snippet.title}</h4>
                <div className="infos">
                  <div className="d-flex gap-20 mt-10 align-center content-betw-resp ">
                    <div className="names">
                      <Link
                        to={`/channel/${apiVideo[0].snippet.channelId}`}
                        className="video-profil-name"
                      >
                        {apiVideo[0].snippet.channelTitle}
                      </Link>
                      <p className="abuneci">180k abunəçi</p>
                    </div>

                    {userHave ? (
                      <button className="abuneOlunub" onClick={removeSub}>
                        abunə olunub
                      </button>
                    ) : (
                      <button className="abuneOl" onClick={newSub}>
                        abunə ol
                      </button>
                    )}
                  </div>

                  <div className="wiew">
                    <div className="like-disLike">
                      <div
                        className="like-body"
                        onClick={() => saveVideo(false)}
                      >
                        <i
                          className={
                            saved.likeVideo
                              ? "fa-solid fa-thumbs-up statment-btn"
                              : "fa-regular fa-thumbs-up statment-btn "
                          }
                        ></i>
                        <p>
                          {numeral(apiVideo[0].statistics.likeCount).format(
                            "0.0a"
                          )}
                        </p>
                      </div>
                      <div className="dis-like-body">
                        <i className="fa-regular fa-thumbs-down statment-btn"></i>
                      </div>
                    </div>
                    <div className="share-body" onClick={shareOptions}>
                      <i className="fa-solid fa-share statment-btn"></i>
                      <p>Paylaşın</p>
                    </div>
                    <div className="share-body">
                      <i className="fa-solid fa-download statment-btn"></i>
                      <p>Endirin</p>
                    </div>
                    <div className="save-settings">
                      {save && (
                        <div className="save-body">
                          <div className="save" onClick={() => saveVideo(true)}>
                            {saved.saveVideo ? (
                              <i className="fa-solid fa-check"></i>
                            ) : (
                              <i className="fa-regular fa-bookmark"></i>
                            )}
                            <p>Saxlayin</p>
                          </div>
                          <div className="save">
                            <i className="fa-regular fa-flag"></i>
                            <p>Xəbər verin</p>
                          </div>
                        </div>
                      )}
                      <div
                        className="share-body"
                        onClick={() => setSave(!save)}
                      >
                        <i className="fa-solid fa-ellipsis statment-btn"></i>
                      </div>
                    </div>
                  </div>
                </div>
                {loginPopup ? (
                  <div className="login-popup">
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
                {likePopup ? (
                  <div className="like-popup">
                    <p className="popup-text">Bu videonu bəyəndiz ?</p>
                    <p className="popup-text">
                      Düşüncələrinizi paylaşmaq üçün daxil olun .
                    </p>
                    <button
                      className="popup-login-btn"
                      onClick={() => setLogin(true)}
                    >
                      Login
                    </button>
                  </div>
                ) : null}
                {savedPopup ? (
                  <div className="saved-popup">
                    <p className="popup-text">
                      Bu videonu daha sonra izləmək istəyirsiniz?
                    </p>
                    <p className="popup-text">
                      Bu videonu sonra izləyinə əlavə etmək üçün daxil olun.
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
              <div className="comments pos-rel">
                <h2 className="comments-num">
                  {allVideoComments ? allVideoComments.length : 0} şərh
                </h2>
                <div className="add-comment">
                  <p className="profil-image">
                    {loginUser?.userName.slice(0, 1)}
                  </p>
                  <input
                    type="text"
                    className="comment-input"
                    placeholder="Şərh əlavə edin"
                    onChange={(e) => addCommentFunc(e)}
                    onFocus={focusİnput}
                    value={comment}
                  />
                </div>
                <div
                  className={
                    isCommentFocused
                      ? "add-button opacity-1"
                      : "add-button opacity-0"
                  }
                >
                  <button className="cancle-button" onClick={cancel}>
                    Ləğv Edin
                  </button>
                  <button
                    type="submit"
                    className="add-btn"
                    onClick={addComment}
                  >
                    Şərh
                  </button>
                </div>

                {allVideoComments &&
                  allVideoComments.map((comment) => (
                    <Comments
                      comment={comment}
                      deleteComment={deleteComment}
                      key={comment.id}
                      updateData={updateData}
                      setNewComment={setNewComment}
                      newComment={newComment}
                    />
                  ))}
              </div>
            </div>
            <div className="right-videos">
              {videos?.items?.map((video) => (
                <RightVideos video={video} key={video.id} />
              ))}
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default VideoPlayer;

//`https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&part=statistics&part=snippet&part=topicDetails&chart=mostPopular&access_token=AIzaSyDj0qtZu8l447RhOo9fCASoY8VSQSe3i2s&pageToken=CAUQAA&key=AIzaSyDj0qtZu8l447RhOo9fCASoY8VSQSe3i2s&id=${channelId}`
