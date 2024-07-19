import React, { useEffect, useState } from "react";
import Navigation from "./navigation";
import Aside from "./aside-left";
import "./style.css";
import "./responsive.css";
import Intro from "./section";
import Toggle from "./toggle-menu";
import { Route, Routes } from "react-router-dom";
import Account from "./Account";
import History from "./history";
import NotFound from "./notFound/NotFound";
import VideoPlayer from "./videoScreen";
import Search from "./search";
import { v4 as uuidv4 } from "uuid";
import AfterWatch from "./after watch";
import LikedVideos from "./liked";
import Detail from "./Channel Detail";
import Trend from "./trend";
import Music from "./music";
import Sport from "./sport";

function Home({ login, setLogin }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleNone, setToggleNone] = useState(false);
  const [position, setPosition] = useState(false);

  return (
    <div>
      <div className="nav-body">
        <Navigation
          toggleMenu={toggleMenu}
          setToggleMenu={setToggleMenu}
          login={login}
          setLogin={setLogin}
        />
      </div>
      <div className="d-flex">
        <div
          className={
            toggleMenu ? "col-lg-1" : position ? "col-lg-2 pos-fix" : "col-lg-2"
          }
        >
          {toggleMenu ? <Toggle toggleNone={toggleNone} /> : <Aside />}
        </div>
        <div
          className={
            toggleMenu
              ? "col-lg-11 padding-15 margin-auto"
              : "col-lg-10 margin-auto"
          }
        >
          <div className=" mt-30 ">
            <Routes>
              <Route path="/search/:name" element={<Search />} />
              <Route
                path="/"
                element={
                  <Intro
                    setToggleMenu={setToggleMenu}
                    setToggleNone={setToggleNone}
                    setPosition={setPosition}
                  />
                }
              />
              <Route
                path="/account"
                element={
                  <Account setPosition={setPosition} setLogin={setLogin} />
                }
              />
              <Route
                path="/history"
                element={
                  <History setPosition={setPosition} setLogin={setLogin} />
                }
              />
              <Route
                path="/saved"
                element={
                  <AfterWatch setPosition={setPosition} setLogin={setLogin} />
                }
              />
              <Route
                path="/liked"
                element={
                  <LikedVideos setPosition={setPosition} setLogin={setLogin} />
                }
              />
              <Route
                path="/popular"
                element={<Trend setPosition={setPosition} />}
              />
              <Route
                path="/music"
                element={<Music setPosition={setPosition} />}
              />
              <Route
                path="/sport"
                element={<Sport setPosition={setPosition} />}
              />
              <Route
                path="/channel/:id"
                element={
                  <Detail setPosition={setPosition} setLogin={setLogin} />
                }
              />

              <Route
                path="/video/:id"
                element={
                  <VideoPlayer
                    setToggleMenu={setToggleMenu}
                    setToggleNone={setToggleNone}
                    setPosition={setPosition}
                    setLogin={setLogin}
                  />
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
