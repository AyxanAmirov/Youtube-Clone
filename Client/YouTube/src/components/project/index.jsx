import { useEffect, useState } from "react";
import "../../layout/layout.css";
import "../../layout/reset.css";
import Sign from "../login/Sign";
import Home from "../Home";
import { BrowserRouter, Router } from 'react-router-dom'


function Youtube() {
  const [login, setLogin] = useState(false);

  return (
    <div>
      {login ? (
        <Sign login={login} setLogin={setLogin} />
      ) : (
        <BrowserRouter>
          <Home login={login} setLogin={setLogin} />
        </BrowserRouter>
      )}
    </div>
  );
}

export default Youtube;
