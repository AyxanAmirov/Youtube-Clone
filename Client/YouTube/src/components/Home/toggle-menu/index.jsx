import React from "react";
import "./toggle.css";
import { NavLink } from "react-router-dom";
function Toggle({ toggleNone }) {
  return (
    <div
      className={toggleNone ? "d-none" : "left-toggle"}
      style={{ marginTop: "16px" }}
    >
      <NavLink to="/" className="toggle-items">
        <i className="fa-solid fa-house left-icons" />
        <p className="toggle-text">Ev</p>
      </NavLink>
      <div className="toggle-items">
        <i className="fa-solid fa-fire-flame-curved left-icons" />
        <p className="toggle-text">Shorts</p>
      </div>
      <div className="toggle-items">
        <i className="fa-brands fa-square-youtube left-icons" />
        <p className="toggle-text">Abunəliklər</p>
      </div>
      <NavLink to="/account" className="toggle-items">
        <i className="fa-solid fa-photo-film left-icons" />
        <p className="toggle-text">Siz</p>
      </NavLink>
    </div>
  );
}

export default Toggle;
