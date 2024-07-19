import React, { useEffect, useState } from "react";
import "./style.css";
import logo from "../../../images/logo.svg";
import { Link } from "react-router-dom";
function Navigation({ toggleMenu, setToggleMenu, login, setLogin }) {
  const [profileSettings, setProfileSettings] = useState(false);
  const [localeStorage, setLocaleStorage] = useState(false);
  const [userInform, setUserInform] = useState({
    userName: "",
    userEmail: "",
  });
  const [search, setSearch] = useState(false);
  const [searchData, setSearchData] = useState();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLocaleStorage(true);
    } else {
      setLocaleStorage(false);
    }
  }, []);

  useEffect(() => {
    let userLogin = JSON.parse(localStorage.getItem("user Id"));
    if (userLogin) {
      fetch(`http://localhost:3000/user/?id=${userLogin.id}`)
        .then((res) => res.json())
        .then((user) =>
          user.forEach((users) => {
            setUserInform({
              userName: users.userName,
              userEmail: users.userEmail,
            });
          })
        );
    } else if (JSON.parse(localStorage.getItem("user"))) {
      let newUser = JSON.parse(localStorage.getItem("user"));
      setUserInform({
        userName: newUser.userName,
        userEmail: newUser.userEmail,
      });
    }
  }, []);

  const settings = () => {
    setProfileSettings(!profileSettings);
  };
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user Id");
    setLogin(!login);
  };
  const dnone = () => {
    setToggleMenu(true);
    setSearch(true);
    window.addEventListener("dblclick", () => {
      setSearch(false);
    });
  };
  const handleMicClick = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "tr-TR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
      const last = event.results.length - 1;
      const query = event.results[last][0].transcript;
      setSearchData(query);
    };

    recognition.start();
  };
  return (
    <nav>
      <div className="d-flex justify-between align-center position">
        <div className={search ? "d-none-res" : "col-lg-3"}>
          <div className="logo-bar">
            <button
              style={{ all: "initial" }}
              type="submit"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <i className="fa-solid fa-bars menu-bar-icon" />
            </button>
            <a href="/" className="logo">
              <img src={logo} alt="YouTube" className="logoCompany" />
            </a>
          </div>
        </div>
        <div
          className={
            search
              ? "w-100 d-flex justify-center"
              : "col-lg-6 d-flex justify-center"
          }
        >
          <form id={search ? null : "search-data"} className=" d-flex">
            <input
              placeholder="Axtarın"
              type="text"
              className="search"
              value={searchData || ""}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <Link to={`/search/${searchData && searchData}`}>
              <button className="search-icon">
                <i className="fa-solid fa-magnifying-glass" />
              </button>
            </Link>
          </form>

          <button
            className={search ? "d-none-res" : " search-icon-res"}
            onClick={dnone}
          >
            <i
              className={
                search
                  ? "d-none-res"
                  : "fa-solid fa-magnifying-glass search-icon-res"
              }
              style={{ alignContent: "space-evenly" }}
            />
          </button>

          <div className="michraphone" onClick={handleMicClick}>
            <i className="fa-solid fa-microphone micro" />
          </div>
        </div>
        <div className={search ? "d-none-res" : "col-lg-3"}>
          <div className="profil">
            <i className="fa-solid fa-video profil-icons" />
            <i className="fa-solid fa-bell profil-icons notice" />
            {localeStorage ? (
              <>
                <p className="profil-image" onClick={settings}>
                  {userInform?.userName?.slice(0, 1)}
                </p>
                {profileSettings ? (
                  <div className="profil-settings">
                    <div className="hesab">
                      <button
                        style={{ all: "initial", cursor: "pointer" }}
                        type="submit"
                        onClick={() => setProfileSettings(false)}
                      >
                        <i className="fa-solid fa-x"></i>
                      </button>
                      <p>Hesab</p>
                    </div>
                    <div className="profil-infor">
                      <p className="profil-image2">
                        {userInform.userName.slice(0, 1)}{" "}
                      </p>
                      <div className="user">
                        <p className="user-txt">{userInform.userName}</p>
                        <p className="user-txt">{userInform.userEmail}</p>
                        <a href="/account" className="account">
                          Kanalınıza baxın
                        </a>
                      </div>
                    </div>
                    <div className="log">
                      <div className="icon-txt2">
                        <i className="fa-brands fa-google"></i>
                        <p className="set-txts">Google Hesabı</p>
                      </div>
                      <div className="icon-txt2">
                        <i className="fa-solid fa-address-card left-icons"></i>
                        <p className="set-txts">Hesablar Arasında keçid edin</p>
                      </div>
                      <div className="icon-txt2" onClick={logOut}>
                        <i className="fa-solid fa-arrow-right-from-bracket left-icons"></i>
                        <p className="set-txts">Çıxın</p>
                      </div>
                    </div>
                    <div className="log">
                      <div className="icon-txt2">
                        <i className="fa-solid fa-building-columns left-icons"></i>
                        <p className="set-txts">YouTube Studiya</p>
                      </div>
                      <div className="icon-txt2">
                        <i className="fa-solid fa-hand-holding-dollar left-icons"></i>
                        <p className="set-txts">Satınalmalar və üzvlüklər</p>
                      </div>
                    </div>
                    <div className="log">
                      <div className="icon-txt2">
                        <i className="fa-solid fa-calendar-week left-icons"></i>
                        <p className="set-txts">YouTube Datanız</p>
                      </div>
                      <div className="icon-txt2">
                        <i className="fa-regular fa-moon left-icons"></i>
                        <p className="set-txts">Görünüş</p>
                      </div>
                      <div className="icon-txt2">
                        <i className="fa-solid fa-language left-icons"></i>
                        <p className="set-txts">Dil</p>
                      </div>
                      <div className="icon-txt2">
                        <i className="fa-solid fa-globe left-icons"></i>
                        <p className="set-txts">Hesablar Arasında keçid edin</p>
                      </div>
                      <div className="icon-txt2">
                        <i className="fa-solid fa-gear left-icons "></i>
                        <p className="set-txts">Ayarlar</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <h4
                className="login"
                style={{ cursor: "pointer" }}
                onClick={() => setLogin(true)}
              >
                Login
              </h4>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
