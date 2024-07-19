import React, { useEffect, useState } from "react";
import "./style.css";
import { Helmet } from "react-helmet";
import Subs from "./subs";

function Account({ setPosition, setLogin }) {
  const [userInform, setUserInform] = useState({
    userName: "",
    userEmail: "",
  });
  const [userHave, setUserHave] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    setPosition(false);
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
    } else {
      setUserHave(false);
    }
  }, []);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:3000/subs")
      .then((resp) => resp.json())
      .then((data) => {
        const existingSubscription = data.filter((channels) =>
          channels.userEmail.includes(userInfo.userEmail)
        );
        setSubscriptions(existingSubscription);
      });
  }, []);

  return (
    <div className="account-body">
      {userHave ? (
        <>
          <Helmet>
            <title>{userInform.userName} - YouTube</title>
          </Helmet>
          <div className="profil-body">
            <div className="account-logo">
              <p className="account-image">{userInform.userName.slice(0, 1)}</p>
            </div>
            <div className="account-inform">
              <h3 className="account-name">{userInform.userName}</h3>
              <p className="account-email">{userInform.userEmail}</p>
              <p className="account-email">
                Bu kanal haqqında ətraflı{" "}
                <i className="fa-solid fa-chevron-right"></i>{" "}
              </p>
              <div className=" gap-10 d-block-flex">
                <p className="ferdilesdir">Kanalı fərdiləşdirin</p>
                <p className="ferdilesdir">Videoları idarə edin</p>
              </div>
            </div>
          </div>
          <div className="abunelikler">
            <div className="d-flex justify-between align-center">
              <h3 className="account-subs">Abunəliklər</h3>
              <a href="#!" className="look-all">
                Hamısına baxın
              </a>
            </div>
            <div className="subs-body">
              {subscriptions.map((subscription) => (
                <Subs key={subscription.id} subscription={subscription} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="login-account">
          <i className="fa-solid fa-right-to-bracket log-iconn"></i>
          <h2>Kanalınızı fərdiləşdirmək üçün qeydiyyatdan keçin</h2>
          <h4>
            Bəyəndiyiniz videoları yaddaşda saxlamaq üçün qeydiyyatdan keçin
          </h4>
          <button className="popup-login-btn" onClick={() => setLogin(true)}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Account;
