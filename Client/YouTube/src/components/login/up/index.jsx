import "./style.css";
import "./responsive.css";
import google from "../../../images/google-logo.png";
import { useState } from "react";

const SignUp = ({ sign, setSign, login, setLogin }) => {
  const [hidePass, setHidePass] = useState(false);
  const [mail, setMail] = useState(false);
  const [pass, setPass] = useState(false);
  const [newUser, setNewUser] = useState({
    userName: "",
    userEmail: "",
    password: "",
  });

  function addDb(e) {
    e.preventDefault();

    if (newUser.password.trim().length >= 5) {
      fetch("http://localhost:3000/user")
        .then((data) => data.json())
        .then((users) => {
          let userHave = users.find(
            (user) => user.userEmail === newUser.userEmail
          );
          if (userHave) {
            setMail(true);
          } else if (!userHave) {
            fetch("http://localhost:3000/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            });
            localStorage.setItem("user", JSON.stringify(newUser));
            setLogin(false);
            setNewUser({
              userName: "",
              userEmail: "",
              password: "",
            });
          }
        });
    } else {
      setPass(!pass);
    }
  }

  return (
    <div className="body">
      <div className="container">
        <div className="input-body">
          <div className="sign-in">
            <div className="col-lg-6">
              <img src={google} alt="google logo" className="google" />
              <h2
                style={{
                  fontSize: "30px",
                  fontWeight: "400",
                  marginTop: "20px",
                }}
              >
                Sign Up
              </h2>
            </div>
            <div className="col-lg-6">
              <form className="form-body" onSubmit={addDb}>
                <input
                  type="text"
                  className="information-input"
                  placeholder="User name"
                  required
                  value={newUser.userName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, userName: e.target.value })
                  }
                />
                <input
                  type="email"
                  className={
                    mail
                      ? "information-input border-wrong"
                      : "information-input"
                  }
                  placeholder="Email adress"
                  required
                  value={newUser.userEmail}
                  onChange={(e) =>
                    setNewUser({ ...newUser, userEmail: e.target.value })
                  }
                />
                {mail ? (
                  <div className="d-flex">
                    <p className="info">
                      <i className="fa-solid fa-exclamation info-icon"></i>{" "}
                    </p>
                    <span className="in-correct ">
                      Bu Mail ilə qeydiyyatdan keçilib
                    </span>
                  </div>
                ) : null}
                <input
                  type={hidePass ? "text" : "password"}
                  className="information-input"
                  placeholder="Password"
                  required
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
                {pass ? (
                  <div className="d-flex">
                    <p className="info">
                      <i className="fa-solid fa-exclamation info-icon"></i>{" "}
                    </p>
                    <span className="in-correct ">
                      Şifrənin uzunluğu 5 simvoldan az olmamalıdır
                    </span>
                  </div>
                ) : null}

                <div className="checkbox-wrapper-28">
                  <input
                    id="tmp-28"
                    type="checkbox"
                    className="promoted-input-checkbox"
                    onChange={() => setHidePass(!hidePass)}
                  />
                  <svg>
                    <use xlinkHref="#checkmark-28" />
                  </svg>
                  <label htmlFor="tmp-28">Show Password</label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: "none" }}
                  >
                    <symbol id="checkmark-28" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        fill="none"
                        d="M22.9 3.7l-15.2 16.6-6.6-7.1"
                      ></path>
                    </symbol>
                  </svg>
                </div>

                <div className="btns-body">
                  <a href="#!" className="btn-in" onClick={() => setSign(true)}>
                    Sign İn
                  </a>
                  <button className="btn">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
