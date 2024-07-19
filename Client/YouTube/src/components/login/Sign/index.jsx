import { useState } from "react";
import SignIn from "../in";
import SignUp from "../up";
import { Helmet } from "react-helmet";

function Sign({ login, setLogin }) {
  const [sign, setSign] = useState(true);

  return (
    <div>
      {" "}
      <Helmet>
        <title>Login</title>
      </Helmet>
      {sign ? (
        <SignIn setLogin={setLogin} sign={sign} setSign={setSign} />
      ) : (
        <SignUp
          sign={sign}
          setSign={setSign}
          setLogin={setLogin}
          login={login}
        />
      )}
    </div>
  );
}

export default Sign;
