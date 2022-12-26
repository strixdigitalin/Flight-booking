import React from "react";
import "./Header.css";
import logo from "../assets/logo-banner/logo.jpeg";
import { Button } from "@mui/material";
function Header() {
  // const logo = window.location.origin + "/mmtLogo.png";
  const mybiz = window.location.origin + "/mybiz.png";
  const travellug = window.location.origin + "/travellug.png";
  const loginorcreate = window.location.origin + "/loginorcreate.png";
  return (
    <div>
      <div className="header-main">
        <div>
          <img
            className="header-img-1"
            src={logo}
            alt="mmt logo"
            width="110"
            height="38"
          />
        </div>
        <div className="header-mybiz" style={{ marginRight: "-50px" }}>
          <img
            className="header-img-2"
            src={mybiz}
            alt="mybiz"
            width="30"
            height="30"
            style={{ paddingRight: "10px" }}
          />
          <div>
            <div className="header-mybiz-1">Introducing </div>
            <div className="header-mybiz-2">Mybookingcart for Business</div>
          </div>
        </div>
        <div className="header-mytrips" style={{ marginLeft: "60px" }}>
          <img
            src={travellug}
            alt="travellug"
            width="30"
            height="30"
            style={{ paddingRight: "10px" }}
          />
          <div>
            <div className="header-mytrips-1">MyTrips</div>
            <div className="header-mytrips-2">Manage your bookings</div>
          </div>
        </div>
        <div className="header-login">
          <Button variant="contained">Login / Signup</Button>
          {/* <img
            src={loginorcreate}
            alt="login"
            width="250"
            height="60"
            style={{ paddingRight: "5px" }}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
