import { NavLink } from "react-router-dom";
import "./style.css";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import LeftSubs from "./left/left";

function Aside() {
  const [logined, setLogined] = useState(false);
  const [subscriptions, setSubscriptions] = useState();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLogined(true);
    } else {
      setLogined(false);
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
    <div className="left-menu">
      <div className="left-items">
        <NavLink to="/" className="icon-txt">
          <i className="fa-solid fa-house left-icons" />
          <p>Home</p>
        </NavLink>
        <div className="icon-txt">
          <i className="fa-solid fa-fire-flame-curved left-icons" />
          <p>Shorts</p>
        </div>
        <div className="icon-txt">
          <i className="fa-brands fa-square-youtube left-icons" />
          <p>Abunəliklər</p>
        </div>
      </div>
      {logined && (
        <>
          <div className="left-items">
            <div className="icon-txt">
              <p>Siz</p>
              <i className="fa-solid fa-chevron-right right-arrow" />
            </div>
            <NavLink to="/account" className="icon-txt">
              <i className="fa-regular fa-address-card left-icons" />
              <p>Kanalınız</p>
            </NavLink>
            <NavLink to="/history" className="icon-txt">
              <i className="fa-solid fa-arrows-rotate left-icons" />
              <p>Tarixçə</p>
            </NavLink>
            <NavLink to="/saved" className="icon-txt">
              <i className="fa-regular fa-clock left-icons" />
              <p>Sonra İzləyin</p>
            </NavLink>
            <NavLink to="/liked" className="icon-txt">
              <i className="fa-regular fa-thumbs-up left-icons" />
              <p>Bəyənilən Videolar</p>
            </NavLink>
          </div>
          <div className="left-items">
            <div className="icon-txt-2">
              <p style={{ fontWeight: 600 }}>Abunəliklər</p>
            </div>
            {subscriptions?.map((subscription) => (
              <LeftSubs key={subscription.id} subscription={subscription} />
            ))}
          </div>
        </>
      )}
      <div className="left-items">
        <div className="icon-txt-2">
          <p style={{ fontWeight: 600 }}>Kəşf Edin</p>
        </div>
        <NavLink to="/popular" className="icon-txt">
          <i className="fa-solid fa-chart-simple left-icons" />
          <p>Trenddə Olan</p>
        </NavLink>
        <NavLink to="/music" className="icon-txt">
          <i className="fa-solid fa-music left-icons" />
          <p>Musiqi</p>
        </NavLink>
        <NavLink to="/sport" className="icon-txt">
          <i className="fa-solid fa-trophy left-icons" />
          <p>İdman</p>
        </NavLink>
      </div>
      <div className="left-items">
        <div className="icon-txt">
          <i className="fa-solid fa-gear left-icons" />
          <p>Ayarlar</p>
        </div>
        <div className="icon-txt">
          <i className="fa-solid fa-font-awesome left-icons" />
          <p>Xəbər Tarixçəsi</p>
        </div>
        <div className="icon-txt">
          <i className="fa-solid fa-question left-icons" />
          <p>Yardım</p>
        </div>
        <div className="icon-txt">
          <i className="fa-solid fa-exclamation left-icons" />
          <p>Rəy Göstərin</p>
        </div>
      </div>
    </div>
  );
}

export default Aside;
