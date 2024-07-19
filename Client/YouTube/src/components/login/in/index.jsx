import "./style.css";
import google from "../../../images/google-logo.png";
import { useState } from "react";

function SignIn({ sign, setSign, setLogin }) {
  const [hidePass, setHidePass] = useState(false);
  const [emailFalse, setEmailFalse] = useState(false);
  const [passFalse, setPassFalse] = useState(false);
  const [inUser, setInUser] = useState({
    userEmail: "",
    password: "",
  });
  function welcome(e) {
    e.preventDefault();
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((users) => {
        let userWithEmail = users.find((user) => user.userEmail === inUser.userEmail);
        let userWithPassword = users.find((user) => user.password === inUser.password);
        
        if (userWithEmail && userWithPassword) {
          localStorage.setItem("user", JSON.stringify(inUser));
          localStorage.setItem("user Id",JSON.stringify({id:userWithEmail.id}))

          setLogin(false);
        } else {
          setEmailFalse(!userWithEmail);
          setPassFalse(!userWithPassword);
        }
      });
      
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
                Sign In
              </h2>
            </div>
            <div className="col-lg-6">
              <form className="form-body" onSubmit={welcome}>
                <input
                  type="email"
                  className={
                    emailFalse
                      ? "information-input border-wrong"
                      : "information-input"
                  }
                  placeholder="Email adress"
                  required
                  onChange={(e) =>
                    setInUser({ ...inUser, userEmail: e.target.value })
                  }
                />
                {emailFalse ? (
                  <div className="d-flex">
                    <p className="info">
                      <i className="fa-solid fa-exclamation info-icon"></i>{" "}
                    </p>
                    <span className="in-correct ">Email adress tapılmadı</span>
                  </div>
                ) : null}
                <input
                  type={hidePass ? "text" : "password"}
                  className={
                    passFalse
                      ? "information-input border-wrong"
                      : "information-input"
                  }
                  placeholder="Password"
                  required
                  onChange={(e) =>
                    setInUser({ ...inUser, password: e.target.value })
                  }
                />
                {passFalse ? (
                  <div className="d-flex">
                    <p className="info">
                      <i className="fa-solid fa-exclamation info-icon"></i>{" "}
                    </p>
                    <span className="in-correct ">Şifrə yanlışdır</span>
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
                  <a
                    href="#!"
                    className="btn-in"
                    onClick={() => setSign(false)}
                  >
                    Sign Up
                  </a>
                  <button className="btn">Sign In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
